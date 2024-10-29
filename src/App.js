
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './pages/UMD.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import PropertyForm from './pages/PropertyForm';
import ChartPage from './pages/ChartPage';
import AboutPage from './pages/AboutPage'; 
import ResultPage from './pages/ResultPage';


const exampleData = {
  values: [3, 2, 2, 150, 850000], // Example: 3 Bedrooms, 2 Bathrooms, 2 Parking spaces, 150 sqm, $850,000 predicted price
  predictedPrice: 850000, // Displayed at the top of the chart
};


function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <nav className="App-nav">
            <Link to="/">Home</Link>
            <Link to="/form">Properties</Link>
            <Link to="/chart">Trends and insights</Link>
            <Link to="/about">Abouts</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<PropertyForm />} />
          <Route path="/chart" element={<ChartPage chartData={exampleData} />} />
          <Route path="/about"element={<AboutPage />} />
          <Route path="/result" element={<ResultPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


