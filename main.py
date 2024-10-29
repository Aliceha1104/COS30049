from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model_path = os.path.join('aimodels', 'model.h5')
model = tf.keras.models.load_model(model_path)

class PredictionInput(BaseModel):
    bedrooms: float
    bathrooms: float
    parking: float

@app.post("/api/predict")
async def predict(input: PredictionInput):
    features = [[input.bedrooms, input.bathrooms, input.parking]]
    prediction = model.predict(features)
    return {"prediction": float(prediction[0][0])}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)