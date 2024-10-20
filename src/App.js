
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import logo from './UMD.svg';
import './App.css';
import LandingPage from './LandingPage';
import PropertyForm from './PropertyForm';
import ChartPage from './ChartPage';
import AboutPage from './AboutPage'; 
import ResultPage from './ResultPage';

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
          <Route path="/chart" element={<ChartPage />} />
          <Route path="/about"element={<AboutPage />} />
          <Route path="/result" element={<ResultPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


