import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For accessing the passed state

function ResultPage() {
  const location = useLocation(); // Get the passed state
  const navigate = useNavigate();
  const { input } = location.state || {}; // Destructure the input values

  // Determine popular size options based on bedrooms
  const getPopularSizes = (bedrooms) => {
    if (bedrooms <= 2) return [50, 75, 100];
    if (bedrooms <= 4) return [100, 150, 200];
    return [200, 250, 300]; // Larger homes
  };

  const popularSizes = getPopularSizes(input.bedrooms);

  return (
    <div className="result-container">
      <h1>Prediction Results</h1>
      <p>Bedrooms: {input.bedrooms}</p>
      <p>Bathrooms: {input.bathrooms}</p>
      <p>Parking Spaces: {input.parking}</p>

      <h2>Select a Popular Size (sqm):</h2>
      <ul>
        {popularSizes.map((size, index) => (
          <li key={index}>{size} sqm</li>
        ))}
      </ul>

      <button onClick={() => navigate('/')}>Back to Form</button>
    </div>
  );
}

export default ResultPage;
