import React, { useState } from 'react';
import axios from 'axios';



function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  
  const apiKey = process.env.REACT_APP_API_KEY;
  
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
  const convertToFahrenheit = (celsius) => (celsius * 9/5) + 32;
  const convertToCelsius = (fahrenheit) => (fahrenheit - 32) * 5/9;
   
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

      setLocation('');
    }
  }
 
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{convertToFahrenheit(data.main.temp).toFixed()}°F / {convertToCelsius(data.main.temp).toFixed()}°C</h1> : null}
          </div>
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <h1>{convertToFahrenheit(data.main.feels_like).toFixed()}°F / {convertToCelsius(data.main.feels_like).toFixed()}°C</h1> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        } 
      </div>
    </div>
  );
}

export default App;
