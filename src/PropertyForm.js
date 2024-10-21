import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // If using react-router for navigation

function PropertyForm() {
  const navigate = useNavigate(); // Use navigation to move to the result page

  const [input, setInput] = useState({
    locations: '',
    bedrooms: '',
    bathrooms: '',
    parking: '',
  });

  const suburbs = [
    'Abbotsford', 'Aberfeldie', 'Airport West', 'Albanvale', 'Albert Park', 'Albion', 'Alphington', 'Altona', 'Altona Meadows', 'Altona North', 
    'Ardeer', 'Armadale', 'Ascot Vale', 'Ashburton', 'Ashwood', 'Aspendale', 
    'Aspendale Gardens', 'Attwood', 'Avondale Heights', 'Bacchus Marsh', 
    'Balaclava', 'Balwyn', 'Balwyn North', 'Bayswater', 'Bayswater North', 
    'Beaconsfield', 'Beaconsfield Upper', 'Beaumaris', 'Bellfield', 
    'Bentleigh', 'Bentleigh East', 'Berwick', 'Black Rock', 'Blackburn', 
    'Blackburn North', 'Blackburn South', 'Boronia', 'Braybrook', 'Briar Hill',
    'Brighton', 'Brighton East', 'Broadmeadows', 'Brooklyn', 'Brunswick',
    'Brunswick East', 'Brunswick West', 'Bulleen', 'Bundoora', 'Burnley',
    'Burwood', 'Burwood East', 'Camberwell', 'Campbellfield', 'Canterbury',
    'Carlton', 'Carlton North', 'Carnegie', 'Carrum', 'Carrum Downs', 'Caulfield',
    'Caulfield East', 'Caulfield North', 'Caulfield South', 'Chadstone',
    'Chelsea', 'Chelsea Heights', 'Cheltenham', 'Clayton', 'Clayton South',
    'Clifton Hill', 'Coburg', 'Coburg North', 'Collingwood', 'Coolaroo',
    'Craigieburn', 'Cranbourne', 'Cranbourne East', 'Cranbourne North',
    'Cranbourne South', 'Cranbourne West', 'Cremorne', 'Dallas', 'Dandenong',
    'Dandenong North', 'Dandenong South', 'Deepdene', 'Deer Park', 'Delahey',
    'Derrimut', 'Diamond Creek', 'Doncaster', 'Doncaster East', 'Donvale',
    'Doreen', 'Eaglemont', 'East Melbourne', 'Elsternwick', 'Eltham',
    'Eltham North', 'Elwood', 'Endeavour Hills', 'Epping', 'Essendon',
    'Essendon North', 'Essendon West', 'Fairfield', 'Fawkner', 'Ferntree Gully',
    'Fitzroy', 'Fitzroy North', 'Flemington', 'Forest Hill', 'Frankston',
    'Frankston North', 'Frankston South', 'Gardenvale', 'Gisborne', 'Gladstone Park',
    'Glen Huntly', 'Glen Iris', 'Glen Waverley', 'Gowanbrae', 'Greensborough',
    'Greenvale', 'Hadfield', 'Hampton', 'Hampton East', 'Hampton Park', 'Hawthorn',
    'Hawthorn East', 'Healesville', 'Heathmont', 'Heidelberg', 'Heidelberg Heights',
    'Heidelberg West', 'Highett', 'Hillside', 'Hoppers Crossing', 'Hughesdale',
    'Huntingdale', 'Ivanhoe', 'Ivanhoe East', 'Jacana', 'Kensington', 'Keon Park',
    'Keilor', 'Keilor Downs', 'Keilor East', 'Keilor Lodge', 'Keilor North',
    'Keilor Park', 'Kew', 'Kew East', 'Keysborough', 'Kilsyth', 'Kilsyth South',
    'Kings Park', 'Kingsbury', 'Kingsville', 'Knoxfield', 'Kooyong', 'Kurunjang',
    'Laverton', 'Lilydale', 'Lower Plenty', 'Lynbrook', 'Lysterfield',
    'Maidstone', 'Malvern', 'Malvern East', 'Maribyrnong', 'Meadow Heights',
    'Melbourne', 'Melton', 'Melton South', 'Melton West', 'Mentone', 'Mernda',
    'Middle Park', 'Mill Park', 'Mitcham', 'Monbulk', 'Mont Albert', 'Montmorency',
    'Montrose', 'Moonee Ponds', 'Moorabbin', 'Mooroolbark', 'Mordialloc',
    'Mount Eliza', 'Mount Evelyn', 'Mount Waverley', 'Mulgrave', 'Narre Warren',
    'Narre Warren North', 'Narre Warren South', 'Newport', 'Niddrie', 'Noble Park',
    'North Melbourne', 'Northcote', 'Notting Hill', 'Oak Park', 'Oakleigh',
    'Oakleigh East', 'Oakleigh South', 'Parkdale', 'Parkville', 'Pascoe Vale',
    'Patterson Lakes', 'Point Cook', 'Port Melbourne', 'Prahran', 'Preston',
    'Reservoir', 'Richmond', 'Ringwood', 'Ringwood East', 'Ringwood North',
    'Ripponlea', 'Roxburgh Park', 'Sandhurst', 'Sandringham', 'Scoresby',
    'Seabrook', 'Seaford', 'Seddon', 'Skye', 'South Kingsville', 'South Melbourne',
    'South Morang', 'South Yarra', 'Southbank', 'Spotswood', 'Springvale',
    'Springvale South', 'St Albans', 'St Helena', 'St Kilda', 'St Kilda East',
    'St Kilda West', 'Strathmore', 'Sunbury', 'Sunshine', 'Sunshine North',
    'Sunshine West', 'Surrey Hills', 'Sydenham', 'Tarneit', 'Taylors Hill',
    'Taylors Lakes', 'Templestowe', 'Templestowe Lower', 'Thomastown',
    'Thornbury', 'Toorak', 'Travancore', 'Truganina', 'Tullamarine', 'Upwey',
    'Vermont', 'Vermont South', 'Viewbank', 'Wantirna', 'Wantirna South',
    'Warrandyte', 'Warrandyte South', 'Waterways', 'Watsonia', 'Watsonia North',
    'Wattle Glen', 'Werribee', 'West Footscray', 'West Melbourne', 'Westmeadows',
    'Wheelers Hill', 'Williams Landing', 'Williamstown', 'Williamstown North',
    'Windsor', 'Wollert', 'Wonga Park', 'Wyndham Vale', 'Yallambie', 'Yarraville'
  ];
  

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/result', { state: { input } });
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Locations: <input
          list="locations" name="location" value={input.location} onChange={handleChange} required placeholder="Enter or select a location"
        /><datalist id="locations">
        {suburbs.map((location, index) => (
          <option key={index} value={location} />
        ))}
      </datalist></label>

      <label>Bedrooms: <input type="number" name="bedrooms" min="0" max="8" onChange={handleChange} required /></label>
      <label>Bathrooms: <input type="number" name="bathrooms" min="0" max="4" onChange={handleChange} required /></label>
      <label>Parking Spaces: <input type="number" name="parking" min="0" max="4" onChange={handleChange} /></label>
      <button type="submit">Predict</button>
    </form>
  );
}

export default PropertyForm;

