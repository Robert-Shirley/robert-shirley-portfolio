// pages/api/weather.ts

import type { NextApiRequest, NextApiResponse } from "next";

interface WeatherData {
  tempF: number;
  tempC: number;
  chanceOfRain: number;
  condition: string;
  location: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const location = req.query.location?.toString();

  if (!location) {
    res.status(400).json({ error: "Location is required" });
    return;
  }

  const apiKey = process.env.WEATHER_API_KEY;

  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
        location
      )}?unitGroup=us&key=${apiKey}&contentType=json`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      tempF: data.currentConditions.temp,
      tempC: ((data.currentConditions.temp - 32) * 5) / 9,
      chanceOfRain: data.currentConditions.precipprob,
      condition: data.currentConditions.conditions,
      location: data.resolvedAddress,
      description: data.description,
    };

    res.status(200).json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}
