import React, { useState } from 'react';

function PropertyForm() {
  const [input, setInput] = useState({ 
    Suburb: '', 
    Rooms: '', 
    Type: '', 
    Method: '', 
    SellerG: '', 
    Distance: '', 
    Postcode: '', 
    Bedroom2: '', 
    Bathroom: '', 
    Car: '', 
    Landsize: '', 
    BuildingArea: '', 
    YearBuilt: '', 
    CouncilArea: '', 
    Lattitude: '', 
    Longtitude: '', 
    Regionname: '', 
    Propertycount: '',
    sale_year: '', 
    transaction_count: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Preparing the input for the prediction model
      const numericInput = {
        ...input,
        Rooms: parseInt(input.Rooms, 10) || 0,
        Distance: parseFloat(input.Distance) || 0,
        Postcode: parseFloat(input.Postcode) || 0,
        Bedroom2: parseFloat(input.Bedroom2) || 0,
        Bathroom: parseFloat(input.Bathroom) || 0,
        Car: parseFloat(input.Car) || 0,
        Landsize: parseFloat(input.Landsize) || 0,
        BuildingArea: parseFloat(input.BuildingArea) || 0,
        YearBuilt: parseFloat(input.YearBuilt) || 0,
        Lattitude: parseFloat(input.Lattitude) || 0,
        Longtitude: parseFloat(input.Longtitude) || 0,
        Propertycount: parseFloat(input.Propertycount) || 0,
        sale_year: parseInt(input.sale_year, 10) || 0,
        transaction_count: parseInt(input.transaction_count, 10) || 0,
        type_Residential_Apartment: input.Type === 'Residential Apartment' ? 1 : 0,
        type_Residential_House: input.Type === 'Residential House' ? 1 : 0,
        
      };

      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(numericInput),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data);
      setError(null);
    } catch (error) {
      console.error('Prediction failed:', error);
      setError('Prediction failed. Please check your input.');
    }
  };

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="Suburb" onChange={handleChange} placeholder="Suburb" />
        <input type="number" name="Rooms" onChange={handleChange} placeholder="Rooms" />
        <input type="text" name="Type" onChange={handleChange} placeholder="Property Type" />
        <input type="text" name="Method" onChange={handleChange} placeholder="Method" />
        <input type="text" name="SellerG" onChange={handleChange} placeholder="Seller Group" />
        <input type="number" name="Distance" onChange={handleChange} placeholder="Distance" />
        <input type="number" name="Postcode" onChange={handleChange} placeholder="Postcode" />
        <input type="number" name="Bedroom2" onChange={handleChange} placeholder="Bedroom 2" />
        <input type="number" name="Bathroom" onChange={handleChange} placeholder="Bathroom" />
        <input type="number" name="Car" onChange={handleChange} placeholder="Car" />
        <input type="number" name="Landsize" onChange={handleChange} placeholder="Landsize" />
        <input type="number" name="BuildingArea" onChange={handleChange} placeholder="Building Area" />
        <input type="number" name="YearBuilt" onChange={handleChange} placeholder="Year Built" />
        <input type="text" name="CouncilArea" onChange={handleChange} placeholder="Council Area" />
        <input type="number" name="Lattitude" onChange={handleChange} placeholder="Latitude" />
        <input type="number" name="Longtitude" onChange={handleChange} placeholder="Longitude" />
        <input type="text" name="Regionname" onChange={handleChange} placeholder="Region Name" />
        <input type="number" name="Propertycount" onChange={handleChange} placeholder="Property Count" />
        <input type="number" name="sale_year" onChange={handleChange} placeholder="Sale Year" />
        <input type="number" name="transaction_count" onChange={handleChange} placeholder="Transaction Count" />
        <button type="submit">Predict Price</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {prediction && <p>Predicted Price: ${prediction.ensemble_prediction.toFixed(2)}</p>}
    </div>
  );
}

export default PropertyForm;
