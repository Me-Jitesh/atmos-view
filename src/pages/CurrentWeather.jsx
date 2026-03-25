import { useState } from "react";

import useGeolocation from "../hooks/useGeolocation";
import useWeather from "../hooks/useWeather";

import DateSelector from "../components/DateSelector";
import TemperatureChart from "../components/charts/TemperatureChart";
import BaseChart from "../components/charts/BaseChart";
import AirQualityChart from "../components/charts/AirQualityChart";
import MetricCard from "../components/ui/MetricCard";

import { filterByDate } from "../utils/format";

function CurrentWeather() {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  const { data, loading, error } = useWeather(
    location.latitude,
    location.longitude,
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  if (geoLoading) return <p>Fetching location...</p>;
  if (geoError) return <p>Error: {geoError}</p>;

  if (loading) return <p>Loading weather data...</p>;
  if (error) return <p>Error: {error}</p>;

  if (!data) return null;

  const selected = new Date(
    selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000,
  )
    .toISOString()
    .split("T")[0];

  const filteredHourly = filterByDate(data, selectedDate);

  const dayIndex = data.daily.time.findIndex((d) => d === selected);

  console.log("Selected:", selected);
  console.log("Filtered:", filteredHourly);

  return (
    <div className="container">
      <h1 className="title">ATMOS VIEW</h1>

      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* 🔹 Current Metrics */}
      <div className="grid grid-2 section">
        <MetricCard
          label="Temperature"
          value={`${data.current.temperature_2m}°C`}
          type="temp"
        />
        <MetricCard
          label="Humidity"
          value={`${data.current.relative_humidity_2m}%`}
          type="humidity"
        />
        <MetricCard
          label="Wind"
          value={`${data.current.wind_speed_10m} km/h`}
          type="wind"
        />
        <MetricCard label="UV Index" value={data.current.uv_index} type="uv" />
      </div>

      {/* 🔹 Daily Summary */}
      {dayIndex !== -1 && (
        <div className="card section">
          <h2 className="subtitle">Daily Summary</h2>
          <div className="grid grid-2">
            <p>Min: {data.daily.temperature_2m_min[dayIndex]}°C</p>
            <p>Max: {data.daily.temperature_2m_max[dayIndex]}°C</p>
            <p>Sunrise: {data.daily.sunrise[dayIndex]}</p>
            <p>Sunset: {data.daily.sunset[dayIndex]}</p>
          </div>
        </div>
      )}

      {/* 🔹 Air Quality */}
      <div className="card section">
        <h2 className="subtitle">Air Quality</h2>
        <div className="grid grid-2">
          <p>PM10: {data.air.hourly.pm10[0]}</p>
          <p>PM2.5: {data.air.hourly.pm2_5[0]}</p>
          <p>CO: {data.air.hourly.carbon_monoxide[0]}</p>
          <p>NO2: {data.air.hourly.nitrogen_dioxide[0]}</p>
        </div>
      </div>

      {/* 🔹 Charts */}
      <div className="section">
        <h2 className="subtitle">Hourly Trends</h2>

        <div className="card">
          <TemperatureChart data={{ hourly: filteredHourly }} />
        </div>

        <div className="card">
          <BaseChart
            title="Humidity"
            data={{ hourly: filteredHourly }}
            dataKey="relative_humidity_2m"
            unit="%"
          />
        </div>

        <div className="card">
          <BaseChart
            title="Wind Speed"
            data={{ hourly: filteredHourly }}
            dataKey="wind_speed_10m"
            unit="km/h"
          />
        </div>

        <div className="card">
          <AirQualityChart data={data} />
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
