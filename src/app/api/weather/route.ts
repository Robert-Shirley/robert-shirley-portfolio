// app/api/weather/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const location = searchParams.get("location");

  if (!location) {
    return NextResponse.json(
      { error: "Location is required" },
      { status: 400 }
    );
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    console.error("Weather API key is not configured");
    return NextResponse.json(
      { error: "API configuration error" },
      { status: 500 }
    );
  }

  try {
    const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      location
    )}?unitGroup=us&key=${apiKey}&contentType=json`;

    console.log("Fetching from:", apiUrl);

    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error("API Response not ok:", {
        status: response.status,
        statusText: response.statusText,
      });
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    if (!data.currentConditions) {
      console.error("Unexpected API response structure:", data);
      throw new Error("Invalid API response structure");
    }

    const weatherData = {
      tempF: data.currentConditions.temp,
      tempC: ((data.currentConditions.temp - 32) * 5) / 9,
      chanceOfRain: data.currentConditions.precipprob,
      condition: data.currentConditions.conditions,
      location: data.resolvedAddress,
      description: data.description,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Error in weather API:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
