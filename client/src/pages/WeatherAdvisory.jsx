import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import BackNavigation from '../components/BackNavigation';

const WeatherAdvisory = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [searchCity, setSearchCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('wheat');
  const [alerts, setAlerts] = useState([]);

  const crops = [
    'wheat', 'rice', 'corn', 'tomato', 'potato', 'onion', 'cotton', 'sugarcane'
  ];

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
        generateAlerts(response.data.data);
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
              generateAlerts(response.data.data);
            } else {
              setError('Failed to fetch weather data');
            }
          } catch (err) {
            console.error('Error fetching weather:', err);
            setError('Error fetching weather data');
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Location access denied. Please search for your city.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation not supported by browser');
      setLoading(false);
    }
  }, []);

  const generateAlerts = (weather) => {
    const newAlerts = [];
    
    // Temperature alerts
    if (weather.current.temp > 40) {
      newAlerts.push({
        type: 'danger',
        icon: '🚨',
        title: 'Extreme Heat Warning',
        message: 'Temperature exceeds 40°C. Immediate action required to protect crops.'
      });
    } else if (weather.current.temp > 35) {
      newAlerts.push({
        type: 'warning',
        icon: '⚠️',
        title: 'High Temperature Alert',
        message: 'Hot weather detected. Increase irrigation and provide shade if possible.'
      });
    }

    // Cold alerts
    if (weather.current.temp < 5) {
      newAlerts.push({
        type: 'danger',
        icon: '❄️',
        title: 'Frost Warning',
        message: 'Freezing temperatures! Cover sensitive crops and use frost protection methods.'
      });
    }

    // Wind alerts
    if (weather.current.windSpeed > 30) {
      newAlerts.push({
        type: 'warning',
        icon: '💨',
        title: 'Strong Wind Alert',
        message: 'High wind speeds detected. Secure structures and check plant support systems.'
      });
    }

    // Humidity alerts
    if (weather.current.humidity > 90) {
      newAlerts.push({
        type: 'warning',
        icon: '💧',
        title: 'High Humidity Alert',
        message: 'Very high humidity may promote fungal diseases. Apply preventive treatments.'
      });
    }

    // Rain alerts
    if (weather.current.conditions.toLowerCase().includes('rain')) {
      newAlerts.push({
        type: 'info',
        icon: '🌧️',
        title: 'Rainfall Detected',
        message: 'Rain in progress. Adjust irrigation schedule and check field drainage.'
      });
    }

    setAlerts(newAlerts);
  };

  const getCropSpecificAdvice = () => {
    if (!weatherData) return '';
    
    const temp = weatherData.current.temp;
    const isRaining = weatherData.current.conditions.toLowerCase().includes('rain');
    
    const advice = {
      wheat: {
        hot: 'Wheat is sensitive to heat. Ensure adequate irrigation and consider early harvest if grain filling is complete.',
        cold: 'Cold weather is generally good for wheat. Monitor for frost damage during flowering stage.',
        rain: 'Heavy rain during harvest can damage wheat grain. Ensure proper drainage in fields.',
        normal: 'Ideal conditions for wheat growth. Maintain regular irrigation and monitor for pests.'
      },
      rice: {
        hot: 'Rice needs continuous water supply in hot weather. Maintain 2-3 inches of standing water.',
        cold: 'Cold weather can slow rice growth. Consider using row covers for protection.',
        rain: 'Rice loves water but excessive rain can cause nutrient leaching. Monitor nitrogen levels.',
        normal: 'Perfect conditions for rice. Maintain flooded fields and apply fertilizers as scheduled.'
      },
      tomato: {
        hot: 'Protect tomatoes from direct sunlight. Use shade cloth and increase watering frequency.',
        cold: 'Tomatoes are frost-sensitive. Use plastic tunnels or bring potted plants indoors.',
        rain: 'Too much rain can cause fungal diseases in tomatoes. Ensure good air circulation.',
        normal: 'Great weather for tomatoes. Regular watering and staking will ensure good yield.'
      },
      potato: {
        hot: 'Hot weather can reduce potato quality. Increase irrigation and consider mulching.',
        cold: 'Potatoes can handle cool weather but protect from frost. Hill up soil around plants.',
        rain: 'Excessive moisture can cause potato rot. Ensure proper drainage and avoid overwatering.',
        normal: 'Excellent conditions for potato growth. Maintain consistent moisture levels.'
      }
    };

    const crop = advice[selectedCrop] || advice.wheat;
    
    if (temp > 35) return crop.hot;
    if (temp < 10) return crop.cold;
    if (isRaining) return crop.rain;
    return crop.normal;
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      'clear': '☀️',
      'sunny': '☀️',
      'partly cloudy': '⛅',
      'cloudy': '☁️',
      'overcast': '☁️',
      'rain': '🌧️',
      'showers': '🌦️',
      'thunderstorm': '⛈️',
      'snow': '❄️',
      'fog': '🌫️',
      'mist': '🌫️'
    };
    
    const lowerCondition = condition.toLowerCase();
    for (const [key, icon] of Object.entries(icons)) {
      if (lowerCondition.includes(key)) {
        return icon;
      }
    }
    return '🌤️';
  };

  useEffect(() => {
    getCurrentLocationWeather();
  }, [getCurrentLocationWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeatherByCity(searchCity);
    setSearchCity('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <BackNavigation title="Back" />
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">🌤️ Weather Advisory</h1>
          <p className="text-gray-600">Comprehensive weather insights for smart farming decisions</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Location Weather</h2>
            <button
              onClick={() => setIsSearchVisible(!isSearchVisible)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              🔍 Search City
            </button>
          </div>
          
          {isSearchVisible && (
            <form onSubmit={handleSearch} className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Search
              </button>
            </form>
          )}
          
          <button
            onClick={getCurrentLocationWeather}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? '📍 Getting Location...' : '📍 Use Current Location'}
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Alerts Section */}
        {alerts.length > 0 && (
          <div className="mb-6 space-y-3">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  alert.type === 'danger' ? 'bg-red-50 border-red-500 text-red-800' :
                  alert.type === 'warning' ? 'bg-yellow-50 border-yellow-500 text-yellow-800' :
                  'bg-blue-50 border-blue-500 text-blue-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{alert.icon}</span>
                  <div>
                    <h3 className="font-semibold">{alert.title}</h3>
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Weather */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{weatherData.location.name}</h2>
                  <p className="text-blue-100">{weatherData.location.region}, {weatherData.location.country}</p>
                </div>
                <span className="text-4xl">{getWeatherIcon(weatherData.current.conditions)}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-4xl font-bold">{Math.round(weatherData.current.temp)}°C</div>
                  <div className="text-blue-100">Feels like {Math.round(weatherData.current.feelsLike)}°C</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{weatherData.current.conditions}</div>
                  <div className="text-blue-100">{weatherData.current.humidity}% Humidity</div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                  <div className="font-semibold">Wind</div>
                  <div>{weatherData.current.windSpeed} km/h</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                  <div className="font-semibold">Visibility</div>
                  <div>{weatherData.current.visibility} km</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded p-2 text-center">
                  <div className="font-semibold">UV Index</div>
                  <div>{weatherData.current.uv}</div>
                </div>
              </div>
            </div>

            {/* Crop-Specific Advisory */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">🌱 Crop Advisory</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Your Crop:
                </label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {crops.map(crop => (
                    <option key={crop} value={crop}>
                      {crop.charAt(0).toUpperCase() + crop.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Today's Recommendation:</h4>
                <p className="text-green-700 text-sm">{getCropSpecificAdvice()}</p>
              </div>
            </div>
          </div>
        )}

        {/* 5-Day Forecast */}
        {weatherData && weatherData.forecast && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">📅 5-Day Forecast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
              {weatherData.forecast.slice(0, 5).map((day, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-700">
                    {index === 0 ? 'Today' : 
                     index === 1 ? 'Tomorrow' : 
                     new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-3xl my-2">{getWeatherIcon(day.icon)}</div>
                  <div className="text-sm text-gray-600">{day.conditions}</div>
                  <div className="font-semibold">
                    {Math.round(day.tempMax)}° / {Math.round(day.tempMin)}°
                  </div>
                  {day.chanceOfRain > 30 && (
                    <div className="text-xs text-blue-600 mt-1">
                      {day.chanceOfRain}% rain
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Farming Tips */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">💡 Weather-Based Farming Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">☀️ Sunny Days</h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• Perfect for field operations and harvesting</li>
                <li>• Increase irrigation frequency</li>
                <li>• Good time for pest control spraying</li>
              </ul>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">🌧️ Rainy Days</h4>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• Avoid field operations to prevent soil compaction</li>
                <li>• Check drainage systems</li>
                <li>• Monitor for fungal disease development</li>
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">🌡️ Hot Weather</h4>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Water crops early morning or late evening</li>
                <li>• Provide shade for sensitive plants</li>
                <li>• Monitor for heat stress symptoms</li>
              </ul>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">❄️ Cold Weather</h4>
              <ul className="text-purple-700 text-sm space-y-1">
                <li>• Protect crops from frost damage</li>
                <li>• Use row covers or plastic tunnels</li>
                <li>• Delay planting of warm-season crops</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdvisory;