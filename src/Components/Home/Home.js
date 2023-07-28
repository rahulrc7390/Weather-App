import React from 'react';
// import './WeatherApp.css';
import WeatherCard from '../WeatherCard/WeatherCard';

const Home = ({ selectedCity, weatherInfo, addFavorite, favorites }) => {
  return (
    <div className="home-screen">
      {selectedCity && weatherInfo ? (
        <WeatherCard weatherInfo={weatherInfo}
          selectedCity={selectedCity}
          onAddToFavorites={addFavorite} />
      ) : (
        <div className="placeholder">No city selected.</div>
      )}
    </div>
  );
};

export default Home;
