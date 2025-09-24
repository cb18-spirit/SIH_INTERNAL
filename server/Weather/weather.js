const readline = require('readline');

const apiKey = '7J8YGPAQM6J96T3HAU6ZSDJDG';
const unitGroup = 'metric';
const contentType = 'json';

// Function to fetch weather timeline for given latitude and longitude
async function fetchWeather(lat, lon) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=${unitGroup}&contentType=${contentType}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

// Function to display weather info
function displayWeather(data) {
    console.log("===== Weather Forecast =====\n");

    data.days.forEach(day => {
        console.log(`Date: ${day.datetime}`);
        console.log(`Temp: ${day.temp}°C`);
        console.log(`Conditions: ${day.conditions}`);
        console.log(`Humidity: ${day.humidity}%`);
        console.log(`Wind Speed: ${day.windspeed} km/h`);
        console.log('---------------------------');
    });
}

// Prompt user to enter GPS coordinates
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter latitude: ", (lat) => {
    rl.question("Enter longitude: ", (lon) => {
        console.log(`Fetching weather for Lat: ${lat}, Lon: ${lon} ...\n`);
        fetchWeather(lat, lon);
        rl.close();
    });
});
