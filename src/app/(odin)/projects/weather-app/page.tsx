"use client";

import Card from "@/components/shared/Card";
import WeatherApp from "@/components/WeatherApp/WeatherApp";

const Index = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-16">
      <Card>
        <h1 className="text-3xl font-bold text-center my-8">Weather App</h1>
        <WeatherApp />
      </Card>
    </div>
  );
};

export default Index;
