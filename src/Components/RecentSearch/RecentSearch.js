import React from 'react';
import './RecentSearch.css'

const RecentSearches = ({ recentSearches, onClearRecentSearches, clearRecentSearches, weatherInfo }) => {
  console.log(recentSearches)
  return (
    <div className='main-container'>
      <div className="recent-searches">
        <div className='header'>
          <h2 className='hd-content'>You recently searched for</h2>
          <button className='btn-recent' onClick={clearRecentSearches}>Clear All</button>
        </div>

        {recentSearches.length === 0 && <p className='no-recent'>No recent search</p>}

        {recentSearches && recentSearches.map((city) => (
          <div className='recent-row'>
            <p>{city.name}</p>
            <p className='temp-container'>{city.temperature} <span>°C</span></p>
            <p className='desc-container'>{city.description}</p>
          </div>

        ))}


      </div>

    </div>
  );
};

export default RecentSearches;