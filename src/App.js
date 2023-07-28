
import './App.css';
import React, { useState, useEffect } from 'react';
import SearchBar from '../src/Components/SearchBar/SearchBar';
import Favorites from './Components/Favourites/Favourites';
import RecentSearches from '../src/Components/RecentSearch/RecentSearch'
import FormattedDateTime from '../src/Components/DateAndTime';
import axios from 'axios';
import Home from './Components/Home/Home'
import { API_BASE_URL, API_KEY, SEARCH_DELAY } from './Constant';
import WeatherCard from './Components/WeatherCard/WeatherCard';


function App() {
  const [favorites, setFavorites] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [showClearModal, setShowClearModal] = useState(false);


  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const storedRecentSearches = localStorage.getItem('recentSearches');
    if (storedRecentSearches) {
      setRecentSearches(JSON.parse(storedRecentSearches));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchCities(searchTerm);
      } else {
        setCityList([]);
      }
    }, [SEARCH_DELAY]);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity.id);
      addRecentSearch(selectedCity);
    }
  }, [selectedCity]);
  const fetchCities = async (query) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/find`, {
        params: {
          q: query,
          type: 'like',
          units: 'metric',
          appid: API_KEY,
        },
      });

      const cities = response.data.list.map((city) => ({
        id: city.id,
        name: city.name,
      }));
      setCityList(cities);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchWeather = async (cityId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/weather`, {
        params: {
          id: cityId,
          name: cityId.name,
          units: 'metric',
          appid: API_KEY,
        },
      });

      setWeatherInfo(response.data);
      console.log(response.data);

    } catch (error) {
      console.error('Error fetching weather information:', error);
    }
    setCityList([]);
    setSearchTerm('');
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedCity(null); // Reset selectedCity when user starts typing a new query
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };
  const addFavorite = () => {
    if (selectedCity) {
      setFavorites((prevFavorites) => [...prevFavorites, selectedCity]);
    }

  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <Home
            selectedCity={selectedCity}
            weatherInfo={weatherInfo}
            addFavorite={addFavorite}
          />
        );
      case 'favorites':
        return <Favorites favorites={favorites} removeFavorite={removeFavorite} weatherInfo={weatherInfo} />;
      case 'recentSearches':
        return (
          <RecentSearches
            recentSearches={recentSearches}
            clearRecentSearches={clearRecentSearches}
            weatherInfo={weatherInfo}
          />
        );
      default:
        return null;
    }
  };



  const removeFavorite = () => {
    setFavorites([]);
  };

  const addRecentSearch = (city) => {
    const recentSearch = {
      id: city.id,
      name: city.name,
      temperature: weatherInfo?.main.temp || '',
      description: weatherInfo?.weather[0].description || '',
      humidity: weatherInfo?.main.humidity || '',
      windSpeed: weatherInfo?.wind.speed || '',
    };

    setRecentSearches((prevSearches) =>
      prevSearches.filter((c) => c.id !== city.id).slice(0, 4)
    );
    setRecentSearches((prevSearches) => [recentSearch, ...prevSearches]);
  };

  const clearRecentSearches = () => {
    setShowClearModal(true);
  };

  const confirmClearRecentSearches = () => {
    setRecentSearches([]);
    setShowClearModal(false);
  };

  const cancelClearRecentSearches = () => {
    setShowClearModal(false);
  };

  return (
    <div className="App">
      <SearchBar searchTerm={searchTerm} handleInputChange={handleInputChange} cityList={cityList} handleCityClick={handleCityClick} />
      <div className="tab-container">
        <button className={activeTab === 'home' ? 'active' : ''} onClick={() => setActiveTab('home')}>
          Home
        </button>
        <button className={activeTab === 'favorites' ? 'active' : ''} onClick={() => setActiveTab('favorites')}>
          Favorites
        </button>
        <button className={activeTab === 'recentSearches' ? 'active' : ''} onClick={() => setActiveTab('recentSearches')}>
          Recent Searches
        </button>
        <FormattedDateTime />
      </div>
      {activeTab === 'home' && (<></>)}
      {renderTabContent()}
      {showClearModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Clear Recent Searches</h3>
            <p>Are you sure you want to clear recent searches?</p>
            <div className="modal-buttons">
              <button onClick={confirmClearRecentSearches}>Yes</button>
              <button onClick={cancelClearRecentSearches}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
