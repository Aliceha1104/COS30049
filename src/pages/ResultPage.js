import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // For accessing the passed state

function ResultPage() {
  const location = useLocation(); // Get the passed state
  const navigate = useNavigate();
  const { input } = location.state || {}; // Destructure the input values

  // Function to determine popular house sizes based on the number of bedrooms
  const getPopularSizes = (bedrooms) => {
    if (bedrooms <= 2) return [130]; // Popular size for 1-2 Rooms
    if (bedrooms <= 4) return [535]; // Popular size for 3-4 Rooms
    return [677.5]; // Popular size for 5+ Rooms
  };

  const popularSizes = getPopularSizes(input.bedrooms); // Get relevant sizes

  return (
    <div className="result-container">
      <h1>Prediction Results</h1>
      <p>Bedrooms: {input.bedrooms}</p>
      <p>Bathrooms: {input.bathrooms}</p>
      <p>Parking Spaces: {input.parking}</p>

      <h2>Average landsize (sqm):</h2>
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

