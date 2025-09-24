import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeatherByCity = useCallback(async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `http://localhost:3000/api/weather/city/${encodeURIComponent(city)}`
      );
      if (response.data.success) {
        setWeatherData(response.data.data);
      } else {
        setError('City not found');
      }
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  }, []);

  const getCurrentLocationWeather = useCallback(() => {
    setLoading(true);
    setError('');
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `http://localhost:3000/api/weather/coordinates/${latitude}/${longitude}`
            );
            if (response.data.success) {
              setWeatherData(response.data.data);
            } else {
              setError('Failed to fetch weather data');
            }
          } catch (err) {
            console.error('Error fetching weather:', err);
            setError('Error fetching weather data');
            // Fallback to default location (Delhi)
            fetchWeatherByCity('Delhi');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Geolocation error:', error);
          setError('Location access denied. Showing weather for Delhi.');
          // Fallback to default location
          fetchWeatherByCity('Delhi');
        }
      );
    } else {
      setError('Geolocation not supported. Showing weather for Delhi.');
      fetchWeatherByCity('Delhi');
    }
  }, [fetchWeatherByCity]);

  // Get user's current location weather on component mount
  useEffect(() => {
    getCurrentLocationWeather();
  }, [getCurrentLocationWeather]);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      fetchWeatherByCity(searchCity.trim());
    }
  };

  const getWeatherIcon = (icon) => {
    const iconMap = {
      'clear-day': '☀️',
      'clear-night': '🌙',
      'rain': '🌧️',
      'snow': '❄️',
      'sleet': '🌨️',
      'wind': '💨',
      'fog': '🌫️',
      'cloudy': '☁️',
      'partly-cloudy-day': '⛅',
      'partly-cloudy-night': '🌙',
      'thunderstorm': '⛈️'
    };
    return iconMap[icon] || '🌤️';
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white mb-8">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold mb-4 md:mb-0">🌤️ Weather Forecast</h2>
        
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name..."
            className="px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm"
          >
            Search
          </button>
        </form>
      </div>

      {/* Current Location Button */}
      <button
        onClick={getCurrentLocationWeather}
        className="mb-4 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition text-sm"
      >
        📍 Use Current Location
      </button>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="text-center py-4">
          <p className="text-red-200">{error}</p>
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !loading && (
        <div>
          {/* Current Weather - Large Display */}
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">{weatherData.location}</h3>
            <div className="flex justify-center items-center gap-4">
              <span className="text-6xl">{getWeatherIcon(weatherData.current.icon)}</span>
              <div>
                <div className="text-5xl font-bold">{Math.round(weatherData.current.temp)}°C</div>
                <div className="text-lg">{weatherData.current.conditions}</div>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="font-semibold">💧 Humidity</div>
                <div>{weatherData.current.humidity}%</div>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-lg">
                <div className="font-semibold">💨 Wind Speed</div>
                <div>{weatherData.current.windSpeed} km/h</div>
              </div>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div>
            <h4 className="text-lg font-semibold mb-3">📅 7-Day Forecast</h4>
            <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
              {weatherData.forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-20 p-3 rounded-lg text-center text-sm"
                >
                  <div className="font-semibold mb-1">
                    {index === 0 ? 'Today' : new Date(day.date).toLocaleDateString('en', { weekday: 'short' })}
                  </div>
                  <div className="text-2xl mb-1">{getWeatherIcon(day.icon)}</div>
                  <div className="font-semibold">{Math.round(day.temp)}°</div>
                  <div className="text-xs opacity-80">
                    {Math.round(day.tempMax)}°/{Math.round(day.tempMin)}°
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;