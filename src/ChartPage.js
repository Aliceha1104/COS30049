import React from 'react';
import { Bar } from 'react-chartjs-2';

function ChartPage({ chartData }) {
  const data = {
    labels: ['Bedrooms', 'Bathrooms', 'Parking', 'Size', 'Predicted Price'],
    datasets: [
      {
        label: 'Property Data',
        data: chartData ? chartData.values : [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2>Estimated Property Value: ${chartData ? chartData.predictedPrice : 0}</h2>
      <Bar data={data} />
    </div>
  );
}

export default ChartPage;
