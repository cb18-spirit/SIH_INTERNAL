import express from "express";
import {
  getWeatherByCoordinates,
  getWeatherByCity,
} from "../controllers/weatherController.js";

const router = express.Router();

// Route to get weather by coordinates (lat, lon)
router.get("/coordinates/:lat/:lon", getWeatherByCoordinates);

// Route to get weather by city name
router.get("/city/:city", getWeatherByCity);

export default router;
