import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PropertyForm() {
  const [input, setInput] = useState({ bedrooms: '', bathrooms: '', parking: '' });
  const navigate = useNavigate();

  const validateInput = () => {
    const { bedrooms, bathrooms, parking } = input;
    if (!bedrooms || !bathrooms || !parking) {
      alert('Please fill in all fields');
      return false;
    }
    if (isNaN(bedrooms) || isNaN(bathrooms) || isNaN(parking)) {
      alert('Please enter valid numbers');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });
      const data = await response.json();
      navigate('/result', { state: { input, prediction: data.prediction } });
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while making the prediction. Please try again.');
    }
  };

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
    const { name, value } = e.target;
    setInput(prevInput => ({ ...prevInput, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="bedrooms">Bedrooms:</label>
        <input
          type="number"
          id="bedrooms"
          name="bedrooms"
          value={input.bedrooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="bathrooms">Bathrooms:</label>
        <input
          type="number"
          id="bathrooms"
          name="bathrooms"
          value={input.bathrooms}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="parking">Parking Spaces:</label>
        <input
          type="number"
          id="parking"
          name="parking"
          value={input.parking}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Predict Price</button>
    </form>
  );
}

export default PropertyForm;