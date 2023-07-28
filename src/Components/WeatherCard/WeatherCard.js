import React from 'react';

const WeatherCard = ({ data, onAddToFavorites, isFavorite, selectedCity, weatherInfo }) => {
  return (
    <div className='main-container'>
      {selectedCity && weatherInfo && (
        <>
          <div className="weather-info">
            <h2>{selectedCity.name}, {weatherInfo.sys.country}</h2>
            <button className="fav-btn" onClick={onAddToFavorites}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
          </div>
          <div className='middle'><p className='temp-container'> {weatherInfo.main.temp}<span className='unit'>°C</span></p>
            <p className='desc-container'>{weatherInfo.weather[0].description}</p>
          </div>
          <div className="weather-info-add">
            <p>Max - Min<p>{weatherInfo.main.temp_max} - {weatherInfo.main.temp_min}</p></p>
            <p>Humidity <p>{weatherInfo.main.humidity}%</p></p>
            <p>Wind Speed<p>{weatherInfo.wind.speed} m/s</p> </p>
            <p>visibility <p>{weatherInfo.visibility}</p></p>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherCard;