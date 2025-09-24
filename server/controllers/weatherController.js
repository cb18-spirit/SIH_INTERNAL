const apiKey = "7J8YGPAQM6J96T3HAU6ZSDJDG";
const unitGroup = "metric";
const contentType = "json";

// Function to fetch weather data by coordinates
export const getWeatherByCoordinates = async (req, res) => {
  const { lat, lon } = req.params;

  if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
    return res.status(400).json({
      success: false,
      message: "Valid latitude and longitude are required",
    });
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=${unitGroup}&contentType=${contentType}&key=${apiKey}`;

  try {
    console.log("Fetching weather from:", url);
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error: ${response.status} - ${errorText}`);
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data received successfully");

    // Format the data for frontend consumption
    const formattedData = {
      location: data.address,
      current: {
        temp: data.currentConditions?.temp || data.days[0].temp,
        conditions:
          data.currentConditions?.conditions || data.days[0].conditions,
        humidity: data.currentConditions?.humidity || data.days[0].humidity,
        windSpeed: data.currentConditions?.windspeed || data.days[0].windspeed,
        icon: data.currentConditions?.icon || data.days[0].icon,
        datetime: data.currentConditions?.datetime || data.days[0].datetime,
      },
      forecast: data.days.slice(0, 7).map((day) => ({
        date: day.datetime,
        temp: day.temp,
        tempMax: day.tempmax,
        tempMin: day.tempmin,
        conditions: day.conditions,
        humidity: day.humidity,
        windSpeed: day.windspeed,
        icon: day.icon,
      })),
    };

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching weather data",
      error: error.message,
    });
  }
};

// Function to fetch weather data by city name
export const getWeatherByCity = async (req, res) => {
  const { city } = req.params;

  if (!city || city.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "City name is required",
    });
  }

  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
    city.trim()
  )}?unitGroup=${unitGroup}&contentType=${contentType}&key=${apiKey}`;

  try {
    console.log("Fetching weather for city:", city);
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Weather API error: ${response.status} - ${errorText}`);
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Weather data received successfully for city:", city);

    // Format the data for frontend consumption
    const formattedData = {
      location: data.address,
      current: {
        temp: data.currentConditions?.temp || data.days[0].temp,
        conditions:
          data.currentConditions?.conditions || data.days[0].conditions,
        humidity: data.currentConditions?.humidity || data.days[0].humidity,
        windSpeed: data.currentConditions?.windspeed || data.days[0].windspeed,
        icon: data.currentConditions?.icon || data.days[0].icon,
        datetime: data.currentConditions?.datetime || data.days[0].datetime,
      },
      forecast: data.days.slice(0, 7).map((day) => ({
        date: day.datetime,
        temp: day.temp,
        tempMax: day.tempmax,
        tempMin: day.tempmin,
        conditions: day.conditions,
        humidity: day.humidity,
        windSpeed: day.windspeed,
        icon: day.icon,
      })),
    };

    res.json({
      success: true,
      data: formattedData,
    });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching weather data",
      error: error.message,
    });
  }
};
