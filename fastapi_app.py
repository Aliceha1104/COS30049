from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from tensorflow.keras.models import load_model
import os

app = FastAPI()

# Function to safely load a model
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
xgb_model = safe_load_model('xgboost_model.joblib', joblib.load)
rf_model = safe_load_model('random_forest_model.joblib', joblib.load)
nn_model = safe_load_model('neural_network_model.h5', load_model)
nn_preprocessor = safe_load_model('nn_preprocessor.joblib', joblib.load)
nn_scaler_y = safe_load_model('nn_scaler_y.joblib', joblib.load)

class PredictionInput(BaseModel):
    # Define input fields based on your features
    Rooms: int
    Type: str
    Method: str
    SellerG: str
    Distance: float
    Postcode: float
    Bathroom: float
    Car: float
    Landsize: float
    BuildingArea: float
    YearBuilt: float
    CouncilArea: str
    Lattitude: float
    Longtitude: float
    Regionname: str

@app.post("/predict")
async def predict(input: PredictionInput):
    try:
        # Convert input to DataFrame
        input_df = pd.DataFrame([input.dict()])
        
        predictions = {}
        
        if xgb_model:
            xgb_pred = xgb_model.predict(input_df)[0]
            predictions["xgboost_prediction"] = float(xgb_pred)
        
        if rf_model:
            rf_pred = rf_model.predict(input_df)[0]
            predictions["random_forest_prediction"] = float(rf_pred)
        
        if nn_model and nn_preprocessor and nn_scaler_y:
            nn_input = nn_preprocessor.transform(input_df)
            nn_pred = nn_model.predict(nn_input)
            nn_pred = nn_scaler_y.inverse_transform(nn_pred)[0][0]
            predictions["neural_network_prediction"] = float(nn_pred)
        
        if predictions:
            predictions["ensemble_prediction"] = np.mean(list(predictions.values()))
            return predictions
        else:
            raise HTTPException(status_code=500, detail="No models available for prediction")
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/")
async def root():
    return {"message": "House Price Prediction API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)