
// LandingPage.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './LandingPage.css'; // Custom CSS for styling

const propertyLocations = [
  { name: 'Melbourne City Center', position: [-37.8136, 144.9631] },
  { name: 'Southbank', position: [-37.822, 144.965] },
  { name: 'Fitzroy', position: [-37.804, 144.978] },
  { name: 'St Kilda', position: [-37.8676, 144.9804] },
];

function LandingPage() {
  return (
    <div className="landing-page">

      {/* Hero Section */}
      <div className="hero-section">
        <h1>Explore Melbourne's Housing Market</h1>
        <p>
          Discover the best places to live and invest in Melbourne with up-to-date property insights and housing trends.
        </p>
        <button className="explore-button">View All Properties</button>
      </div>

      {/* Map Section */}
      <MapContainer
        center={[-37.8136, 144.9631]}
        zoom={12}
        style={{
          height: '400px',
          width: '80%',
          margin: '30px auto',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {propertyLocations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>{location.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default LandingPage;
