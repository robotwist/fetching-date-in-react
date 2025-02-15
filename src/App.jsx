import * as weatherService from './services/weatherService';
import WeatherSearch from './components/WeatherSearch/WeatherSearch.jsx';
import './App.css';

import { useState, useEffect } from 'react';

const App = () => {
  const [weather, setWeather] = useState(null);
  const [hottest, setHottest] = useState(null);
  const [coldest, setColdest] = useState(null);

  const fetchData = async (city) => {
    const data = await weatherService.show(city);
    const newWeatherState = {
      location: data.location.name,
      temperature: data.current.temp_f,
      condition: data.current.condition.text,
    };
    setWeather(newWeatherState);
  };

  const fetchMultipleData = async (cities) => {
    const data = await weatherService.showMultiple(cities);
    const sortedData = data.sort((a, b) => b.current.temp_f - a.current.temp_f);
    setHottest(sortedData[0]);
    setColdest(sortedData[sortedData.length - 1]);
  };

  useEffect(() => {
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    fetchMultipleData(cities);
  }, []);

  return (
    <main>
      <h1>Weather API</h1>
      <WeatherSearch fetchData={fetchData} />
      {weather && (
        <div>
          <h2>{weather.location}</h2>
          <p>{weather.temperature}°F</p>
          <p>{weather.condition}</p>
        </div>
      )}
      {hottest && (
        <div className="hottest">
          <h2>Hottest Place: {hottest.location.name}</h2>
          <p>{hottest.current.temp_f}°F</p>
          <p>{hottest.current.condition.text}</p>
        </div>
      )}
      {coldest && (
        <div className="coldest">
          <h2>Coldest Place: {coldest.location.name}</h2>
          <p>{coldest.current.temp_f}°F</p>
          <p>{coldest.current.condition.text}</p>
        </div>
      )}
    </main>
  );
};

export default App;