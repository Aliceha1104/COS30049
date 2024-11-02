from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from tensorflow.keras.models import load_model
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static files
app.mount("/static", StaticFiles(directory="build/static"), name="static")

@app.get("/")
async def root():
    return FileResponse("build/index.html")

def safe_load_model(model_path, loader_func):
    if os.path.exists(model_path):
        try:
            return loader_func(model_path)
        except Exception as e:
            print(f"Error loading {model_path}: {str(e)}")
            return None
    else:
        print(f"Model file not found: {model_path}")
        return None

# Load models
# Load models
xgb_model = safe_load_model('aimodels/xgboost_model.joblib', joblib.load)
rf_model = safe_load_model('aimodels/random_forest_model.joblib', joblib.load)
nn_model = safe_load_model('aimodels/neural_network_model.h5', load_model)
nn_preprocessor = safe_load_model('aimodels/nn_preprocessor.joblib', joblib.load)
nn_scaler_y = safe_load_model('aimodels/nn_scaler_y.joblib', joblib.load)

if not xgb_model or not rf_model or not nn_model or not nn_preprocessor or not nn_scaler_y:
    print("One or more models failed to load.")


class PredictionInput(BaseModel):
    Suburb: str
    Address: str
    Rooms: int
    Type: str
    Method: str
    SellerG: str
    Distance: float
    Postcode: float
    Bedroom2: float
    Bathroom: float
    Car: float
    Landsize: float
    BuildingArea: float
    YearBuilt: float
    CouncilArea: str
    Lattitude: float
    Longtitude: float
    Regionname: str
    Propertycount: float

def preprocess_input(input_data: PredictionInput):
    """Preprocess the input data to match model requirements."""
    # Convert input to DataFrame
    input_df = pd.DataFrame([input_data.dict()])
    
    # Create dummy variables for categorical columns
    # Type dummies
    type_dummies = pd.get_dummies(input_df['Type'], prefix='type')
    input_df = pd.concat([input_df, type_dummies], axis=1)
    
    # Method dummies
    method_dummies = pd.get_dummies(input_df['Method'], prefix='method')
    input_df = pd.concat([input_df, method_dummies], axis=1)
    
    # SellerG dummies
    seller_dummies = pd.get_dummies(input_df['SellerG'], prefix='seller')
    input_df = pd.concat([input_df, seller_dummies], axis=1)
    
    # Regionname dummies
    region_dummies = pd.get_dummies(input_df['Regionname'], prefix='region')
    input_df = pd.concat([input_df, region_dummies], axis=1)
    
    # CouncilArea dummies
    council_dummies = pd.get_dummies(input_df['CouncilArea'], prefix='council')
    input_df = pd.concat([input_df, council_dummies], axis=1)
    
    # Add derived features
    input_df['sale_year'] = 2024  # Current year
    input_df['transaction_count'] = input_df['Propertycount']  # Use actual property count
    
    # Select numerical features
    numerical_features = [
        'Rooms', 'Distance', 'Postcode', 'Bedroom2', 'Bathroom', 'Car',
        'Landsize', 'BuildingArea', 'YearBuilt', 'Lattitude', 'Longtitude',
        'Propertycount', 'sale_year', 'transaction_count'
    ]
    
    # Combine all features
    model_features = numerical_features + [col for col in input_df.columns 
                                         if col.startswith(('type_', 'method_', 'seller_', 'region_', 'council_'))]
    
    return input_df[model_features]

@app.post("/predict")
async def predict(input: PredictionInput):
    try:
        # Preprocess input data
        processed_input = preprocess_input(input)
        
        predictions = {}

        # Make predictions with each model
        if xgb_model:
            try:
                xgb_pred = xgb_model.predict(processed_input)[0]
                predictions["xgboost_prediction"] = float(xgb_pred)
            except Exception as e:
                print(f"XGBoost prediction error: {str(e)}")

        if rf_model:
            try:
                rf_pred = rf_model.predict(processed_input)[0]
                predictions["random_forest_prediction"] = float(rf_pred)
            except Exception as e:
                print(f"Random Forest prediction error: {str(e)}")

        if nn_model and nn_preprocessor and nn_scaler_y:
            try:
                nn_input = nn_preprocessor.transform(processed_input)
                nn_pred = nn_model.predict(nn_input)
                nn_pred = nn_scaler_y.inverse_transform(nn_pred)[0][0]
                predictions["neural_network_prediction"] = float(nn_pred)
            except Exception as e:
                print(f"Neural Network prediction error: {str(e)}")

        if predictions:
            predictions["ensemble_prediction"] = np.mean(list(predictions.values()))
            return predictions
        else:
            raise HTTPException(status_code=500, detail="No models available for prediction")

    except Exception as e:
        print(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)