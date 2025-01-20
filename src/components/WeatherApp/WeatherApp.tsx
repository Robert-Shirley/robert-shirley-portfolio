// pages/index.tsx

import { useState } from "react";

interface WeatherData {
  tempF: number;
  tempC: number;
  chanceOfRain: number;
  condition: string;
  location: string;
  description: string;
}

const WeatherApp: React.FC = () => {
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setWeatherData(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const locationInput = formData.get("location")?.toString();

    if (!locationInput) {
      setError("Please enter a location");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/weather?location=${encodeURIComponent(locationInput)}`
      );

      // First try to get the response as text
      const responseText = await res.text();

      let data;
      try {
        // Then try to parse it as JSON
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText);
        throw new Error("Invalid response format from server");
      }

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch weather data");
      }

      setWeatherData(data);
    } catch (err: any) {
      console.error("Error fetching weather data:", err);
      setError(
        err.message || "Could not fetch weather data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // ... rest of the component

  const toggleUnit = () => {
    setUnit(unit === "imperial" ? "metric" : "imperial");
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row mb-8">
        <input
          type="text"
          name="location"
          placeholder="Enter city or zip code"
          className="flex-grow border md:rounded-l px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-2 md:rounded-r"
        >
          Search
        </button>
      </form>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weatherData ? (
        <div className="bg-white p-6 rounded border border-gray-100 w-full   ">
          <h1 className="text-2xl font-bold mb-4">
            Weather in {weatherData.location}
          </h1>

          <p className="text-xl">
            Temperature:{" "}
            {unit === "imperial"
              ? weatherData.tempF.toFixed(1)
              : weatherData.tempC.toFixed(1)}
            °{unit === "imperial" ? "F" : "C"}
          </p>
          <p className="text-lg">Condition: {weatherData.condition}</p>
          <p className="text-lg">Description: {weatherData.description}</p>

          <p className="text-lg">Chance of Rain: {weatherData.chanceOfRain}%</p>
          <button
            onClick={toggleUnit}
            className="mt-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Switch to {unit === "imperial" ? "Celsius" : "Fahrenheit"}
          </button>
        </div>
      ) : (
        !error && (
          <p className="text-gray-700">
            Enter a location to get the weather information.
          </p>
        )
      )}
    </div>
  );
};

export default WeatherApp;
