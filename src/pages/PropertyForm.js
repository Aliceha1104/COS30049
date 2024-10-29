import React, { useState } from 'react';

function PropertyForm() {
  const [input, setInput] = useState({ bedrooms: '', bathrooms: '', parking: '' });
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Prediction failed:', error);
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: parseFloat(e.target.value) });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="bedrooms"
          value={input.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms"
          step="0.1"
        />
        <input
          type="number"
          name="bathrooms"
          value={input.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms"
          step="0.1"
        />
        <input
          type="number"
          name="parking"
          value={input.parking}
          onChange={handleChange}
          placeholder="Parking spaces"
          step="0.1"
        />
        <button type="submit">Predict Price</button>
      </form>
      {prediction && <p>Predicted Price: ${prediction.toFixed(2)}</p>}
    </div>
  );
}

export default PropertyForm;