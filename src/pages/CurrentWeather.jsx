import { useState } from "react";

import useGeolocation from "../hooks/useGeolocation";
import useWeather from "../hooks/useWeather";

import DateSelector from "../components/DateSelector";
import TemperatureChart from "../components/charts/TemperatureChart";
import BaseChart from "../components/charts/BaseChart";
import AirQualityChart from "../components/charts/AirQualityChart";

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
    <div style={{ padding: "1rem" }}>
      <h1>Atmos View 🌦️</h1>

      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <section>
        <h2>Current Conditions</h2>
        <p>Temperature: {data.current.temperature_2m}°C</p>
        <p>Humidity: {data.current.relative_humidity_2m}%</p>
        <p>UV Index: {data.current.uv_index}</p>
        <p>Wind Speed: {data.current.wind_speed_10m} km/h</p>
        <p>Precipitation: {data.current.precipitation} mm</p>
      </section>

      {dayIndex !== -1 && (
        <section>
          <h2>Daily Summary</h2>
          <p>Min Temp: {data.daily.temperature_2m_min[dayIndex]}°C</p>
          <p>Max Temp: {data.daily.temperature_2m_max[dayIndex]}°C</p>

          <p>Sunrise: {data.daily.sunrise[dayIndex]}</p>
          <p>Sunset: {data.daily.sunset[dayIndex]}</p>

          <p>
            Precipitation Probability Max:{" "}
            {data.daily.precipitation_probability_max[dayIndex]}%
          </p>

          <p>Max Wind Speed: {data.daily.wind_speed_10m_max[dayIndex]} km/h</p>
        </section>
      )}

      <section>
        <h2>Air Quality</h2>
        <p>PM10: {data.air.hourly.pm10[0]}</p>
        <p>PM2.5: {data.air.hourly.pm2_5[0]}</p>
        <p>CO: {data.air.hourly.carbon_monoxide[0]}</p>
        <p>NO2: {data.air.hourly.nitrogen_dioxide[0]}</p>
        <p>SO2: {data.air.hourly.sulphur_dioxide[0]}</p>
      </section>

      <section>
        <h2>Hourly Charts</h2>

        <TemperatureChart data={{ hourly: filteredHourly }} />

        <BaseChart
          title="Humidity"
          data={{ hourly: filteredHourly }}
          dataKey="relative_humidity_2m"
          unit="%"
        />

        <BaseChart
          title="Precipitation"
          data={{ hourly: filteredHourly }}
          dataKey="precipitation"
          unit="mm"
        />

        <BaseChart
          title="Visibility"
          data={{ hourly: filteredHourly }}
          dataKey="visibility"
          unit="m"
        />

        <BaseChart
          title="Wind Speed"
          data={{ hourly: filteredHourly }}
          dataKey="wind_speed_10m"
          unit="km/h"
        />

        <AirQualityChart data={data} />
      </section>
    </div>
  );
}

export default CurrentWeather;
