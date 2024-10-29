import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sklearn.ensemble import RandomForestRegressor
import joblib

app = FastAPI()

# Load the trained model
model = joblib.load('trained_model.joblib')

# Load the preprocessor
preprocessor = joblib.load('preprocessor.joblib')

class PredictionInput(BaseModel):
    # Define input fields based on your model's features
    # Example:
    bedrooms: int
    bathrooms: int
    car_spaces: int
    suburb: str
    property_type: str

@app.post("/predict")
async def predict(input: PredictionInput):
    try:
        # Convert input to DataFrame
        input_df = pd.DataFrame([input.dict()])
        
        # Preprocess the input
        processed_input = preprocessor.transform(input_df)
        
        # Make prediction
        prediction = model.predict(processed_input)
        
        return {"predicted_price": float(prediction[0])}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)