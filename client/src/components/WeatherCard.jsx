import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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
        setIsSearchVisible(false);
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
      setSearchCity('');
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

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-green-500 to-green-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-green-500 to-green-700 backdrop-blur-lg p-6 rounded-2xl shadow-lg text-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold mb-2">🌦️ Weather Insights</h2>
        <button
          onClick={() => setIsSearchVisible(!isSearchVisible)}
          className="text-sm bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg transition"
        >
          📍 Change Location
        </button>
      </div>

      {/* Search Form */}
      {isSearchVisible && (
        <form onSubmit={handleSearch} className="mb-4 flex gap-2">
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-1 px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-3 py-2 rounded-lg font-semibold hover:bg-gray-100 transition text-sm"
          >
            Search
          </button>
        </form>
      )}

      {error && (
        <div className="text-red-200 text-sm mb-4">{error}</div>
      )}

      {weatherData && (
        <div>
          {/* Current Weather */}
          <div className="text-center mb-4">
            <div className="text-sm opacity-90 mb-1">{weatherData.location}</div>
            <div className="flex justify-center items-center gap-3">
              <span className="text-3xl">{getWeatherIcon(weatherData.current.icon)}</span>
              <div>
                <div className="text-2xl font-bold">{Math.round(weatherData.current.temp)}°C</div>
                <div className="text-sm opacity-90">{weatherData.current.conditions}</div>
              </div>
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg text-center">
              <div className="font-semibold">💧 Humidity</div>
              <div>{weatherData.current.humidity}%</div>
            </div>
            <div className="bg-white bg-opacity-20 p-2 rounded-lg text-center">
              <div className="font-semibold">💨 Wind</div>
              <div>{weatherData.current.windSpeed} km/h</div>
            </div>
          </div>

          {/* Tomorrow's Forecast */}
          {weatherData.forecast && weatherData.forecast[1] && (
            <div className="mt-4 pt-4 border-t border-white border-opacity-20">
              <div className="text-sm font-semibold mb-2">📅 Tomorrow</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getWeatherIcon(weatherData.forecast[1].icon)}</span>
                  <span className="text-sm">{weatherData.forecast[1].conditions}</span>
                </div>
                <div className="text-sm font-semibold">
                  {Math.round(weatherData.forecast[1].tempMax)}°/{Math.round(weatherData.forecast[1].tempMin)}°
                </div>
              </div>
            </div>
          )}

          {/* Refresh Button */}
          <div className="mt-4 pt-4 border-t border-white border-opacity-20 text-center">
            <button
              onClick={getCurrentLocationWeather}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition text-sm font-medium"
            >
              🔄 Refresh Weather
            </button>
          </div>
        </div>
      )}

      {/* Farming Tip */}
      {weatherData && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          <div className="text-sm">
            <span className="font-semibold">🌱 Farming Insight: </span>
            {weatherData.current.temp > 35 ? "⚠️ Extreme heat! Water crops early morning or evening." :
             weatherData.current.temp > 30 ? "🌡️ Hot weather. Increase irrigation frequency." :
             weatherData.current.conditions.toLowerCase().includes('rain') ? "🌧️ Rain detected! Postpone irrigation and check drainage." :
             weatherData.current.humidity > 85 ? "💧 High humidity may cause fungal diseases. Apply preventive measures." :
             weatherData.current.windSpeed > 25 ? "💨 Strong winds! Secure loose structures and check plant support." :
             weatherData.current.temp < 10 ? "❄️ Cold weather! Protect sensitive crops from frost." :
             "✅ Ideal conditions for most farming activities!"}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;