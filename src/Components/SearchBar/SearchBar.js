import React, { useState, useEffect } from 'react';
import './SearchBar.css'




const SearchBar = ({ onSearch, searchTerm, handleInputChange, cityList, handleCityClick }) => {

  return (
    <div className="weather-app">
      <div className='header'>
        <h1 className='header-content'>WEATHER</h1>
        <div className='input-container'>
          <input type="text" placeholder="Search City" value={searchTerm} onChange={handleInputChange} id="search-input " />
          <div className='dropdown-menu'>
            <div className="dropdown-item">
              {cityList.map((city) => (
                <div key={city.id} onClick={() => handleCityClick(city)}>
                  {city.name}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>


      {/* <WeatherCard weatherInfo={weatherInfo}
      selectedCity={selectedCity} isFavorite={favorites.some((fav) => fav.id === weatherInfo.id)}
       onAddToFavorites={addFavorite}/> */}
    </div>
  );
};

export default SearchBar;