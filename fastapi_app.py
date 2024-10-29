from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
from tensorflow.keras.models import load_model

app = FastAPI()

# Load models
xgb_model = joblib.load('xgboost_model.joblib')
rf_model = joblib.load('random_forest_model.joblib')
nn_model = load_model('neural_network_model.h5')
nn_preprocessor = joblib.load('nn_preprocessor.joblib')
nn_scaler_y = joblib.load('nn_scaler_y.joblib')

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
        
        # XGBoost prediction
        xgb_pred = xgb_model.predict(input_df)[0]
        
        # Random Forest prediction
        rf_pred = rf_model.predict(input_df)[0]
        
        # Neural Network prediction
        nn_input = nn_preprocessor.transform(input_df)
        nn_pred = nn_model.predict(nn_input)
        nn_pred = nn_scaler_y.inverse_transform(nn_pred)[0][0]
        
        # Ensemble prediction (average of all models)
        ensemble_pred = np.mean([xgb_pred, rf_pred, nn_pred])
        
        return {
            "xgboost_prediction": float(xgb_pred),
            "random_forest_prediction": float(rf_pred),
            "neural_network_prediction": float(nn_pred),
            "ensemble_prediction": float(ensemble_pred)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)