import React, { useState } from 'react';

function PropertyForm() {
  const [input, setInput] = useState({
    bedrooms: '',
    bathrooms: '',
    parking: '',
    suburb: '',
    address: '',
    postcode: '',  
    distance: '',  
    yearBuilt: '', 
    councilArea: '', 
    latitude: '', 
    longitude: '' 
  });
  const [prediction, setPrediction] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
    Suburb: input.suburb,
    Address: input.address,
    Rooms: parseInt(input.bedrooms),
    Type: "House",
    Method: "Sale",
    SellerG: "Agent",
    Distance: parseFloat(input.distance),
    Postcode: parseFloat(input.postcode),
    Bedroom2: parseFloat(input.bedrooms),  // Same as Rooms
    Bathroom: parseFloat(input.bathrooms),
    Car: parseFloat(input.parking),
    Landsize: 400.0,
    BuildingArea: 150.0,
    YearBuilt: parseInt(input.yearBuilt),
    CouncilArea: input.councilArea,
    Lattitude: parseFloat(input.latitude),
    Longtitude: parseFloat(input.longitude),
    Regionname: "Southern Metropolitan",
    Propertycount: 100.0
};

    console.log('Payload:', JSON.stringify(payload));

    try {
        const response = await fetch('http://localhost:8000/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPrediction(data);
    } catch (error) {
        console.error('Prediction failed:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'parking' || name === 'distance' || name === 'yearBuilt' || name === 'postcode' || name === 'latitude' || name === 'longitude' ? parseFloat(value) : value });
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
        <input
          type="text" 
          name="suburb" 
          value={input.suburb} 
          onChange={handleChange} 
          placeholder="Suburb" 
        />
        <input
          type="text"
          name="address" 
          value={input.address} 
          onChange={handleChange} 
          placeholder="Address" 
        />
        <input
          type="text"
          name="postcode" 
          value={input.postcode} 
          onChange={handleChange} 
          placeholder="Postcode" 
        />
        <input
          type="number"
          name="distance"
          value={input.distance}
          onChange={handleChange}
          placeholder="Distance to city center"
          step="0.1"
        />
        <input
          type="number"
          name="yearBuilt"
          value={input.yearBuilt}
          onChange={handleChange}
          placeholder="Year Built"
        />
        <input
          type="text"
          name="councilArea"
          value={input.councilArea}
          onChange={handleChange}
          placeholder="Council Area"
        />
        <input
          type="number"
          name="latitude"
          value={input.latitude}
          onChange={handleChange}
          placeholder="Latitude"
          step="any"
        />
        <input
          type="number"
          name="longitude"
          value={input.longitude}
          onChange={handleChange}
          placeholder="Longitude"
          step="any"
        />
        <button type="submit">Predict Price</button>
      </form>
      {prediction && (
        <div style={{ marginTop: '20px' }}>
          <h3>Price Predictions:</h3>
          {Object.entries(prediction).map(([model, value]) => (
            <p key={model}>
              {model.replace(/_/g, ' ')}: ${Number(value).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyForm;