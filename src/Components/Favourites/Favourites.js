import React from 'react';
import './Favourite.css';

const Favorites = ({ favorites, removeFavorite, weatherInfo }) => {
  return (
    <div className='main-container'>
      <div className='header'><h2 className='fav-header'>City added as Favorites</h2>
        <button className='btn-remove' onClick={removeFavorite}>Remove All</button>
      </div>
      {favorites.length === 0 && <p className='no-fav'>No Favourites Added</p>}
      {favorites.map((fav) => (
        <div key={fav.id} className='fav-container'>
          <p>{fav.name}</p>
          <p className='temp-container'> {weatherInfo.main.temp}<span className='units'>°C</span></p>
          <p className='desc-container'>{weatherInfo.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

export default Favorites;