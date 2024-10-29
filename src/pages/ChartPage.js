// import React from 'react';
// import { Bar } from 'react-chartjs-2';

// function ChartPage({ chartData }) {
//   const data = {
//     labels: ['Bedrooms', 'Bathrooms', 'Parking', 'Size', 'Predicted Price'],
//     datasets: [
//       {
//         label: 'Property Data',
//         data: chartData ? chartData.values : [],
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//           'rgba(255, 205, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(201, 203, 207, 0.2)'
//         ],
//         borderColor: [
//           'rgb(255, 99, 132)',
//           'rgb(255, 159, 64)',
//           'rgb(255, 205, 86)',
//           'rgb(75, 192, 192)',
//           'rgb(54, 162, 235)',
//           'rgb(153, 102, 255)',
//           'rgb(201, 203, 207)'
//         ],
//         borderWidth: 1
//       },
//     ],
//   };

//   return (
//     <div className="chart-container">
//       <h2>Estimated Property Value: ${chartData ? chartData.predictedPrice : 0}</h2>
//       <Bar data={data} />
//     </div>
//   );
// }

// export default ChartPage;


import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { ChartSkeleton } from '../components/ChartSkeleton';

// Simulated data
const priceData = [
  { month: 'Jan', value: 850000 },
  { month: 'Feb', value: 870000 },
  { month: 'Mar', value: 890000 },
  { month: 'Apr', value: 915000 },
  { month: 'May', value: 925000 },
  { month: 'Jun', value: 950000 },
];

const marketTrendsData = [
  { month: 'Jan', sales: 120, listings: 150 },
  { month: 'Feb', sales: 140, listings: 160 },
  { month: 'Mar', sales: 160, listings: 140 },
  { month: 'Apr', sales: 180, listings: 130 },
  { month: 'May', sales: 200, listings: 120 },
  { month: 'Jun', sales: 220, listings: 110 },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-header">
            <TrendingUp size={32} />
            <h1 className="hero-title">Trends and Insights</h1>
          </div>
          <p className="hero-description">
            Stay informed with the latest Melbourne housing market trends and data-driven insights
            to make better property decisions.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard
            title="Average Property Value"
            value="$950,000"
            change={5.2}
            isLoading={isLoading}
          />
          <StatCard
            title="Monthly Sales"
            value="220"
            change={10}
            isLoading={isLoading}
          />
          <StatCard
            title="Active Listings"
            value="1,450"
            change={-2.5}
            isLoading={isLoading}
          />
          <StatCard
            title="Days on Market"
            value="28"
            change={-15}
            isLoading={isLoading}
          />
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          {/* Price Trends Chart */}
          <div className="chart-container">
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <>
                <h2 className="chart-title">Price Trends</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </div>

          {/* Market Activity Chart */}
          <div className="chart-container">
            {isLoading ? (
              <ChartSkeleton />
            ) : (
              <>
                <h2 className="chart-title">Market Activity</h2>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={marketTrendsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sales"
                      stackId="1"
                      stroke="#3B82F6"
                      fill="#93C5FD"
                    />
                    <Area
                      type="monotone"
                      dataKey="listings"
                      stackId="1"
                      stroke="#2563EB"
                      fill="#60A5FA"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;