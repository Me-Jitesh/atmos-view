import { useState } from "react";

import useGeolocation from "../hooks/useGeolocation";
import useHistorical from "../hooks/useHistorical";
import DateRangeSelector from "../components/DateRangeSelector";
import BaseChart from "../components/charts/BaseChart";

function formatDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

function Historical() {
  const { location, loading: geoLoading, error: geoError } =
    useGeolocation();

  // ✅ Default range (last 7 days)
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 7);

  const [range, setRange] = useState({
    start: formatDate(past),
    end: formatDate(today),
  });

  const { data, loading, error } = useHistorical(
    location.latitude,
    location.longitude,
    range.start,
    range.end
  );

  // 🔹 Handle GPS states
  if (geoLoading) return <p>Getting location...</p>;
  if (geoError) return <p>Error: {geoError}</p>;

  // 🔹 Handle API states
  if (loading) return <p>Loading historical data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Historical Weather 📊</h1>

      {/* 📅 Date Range Picker */}
      <DateRangeSelector setRange={setRange} />

      {/* 📊 Charts */}
      {data && data.daily && data.daily.time.length > 0 ? (
        <>
          <h2>Temperature Trends</h2>

          <BaseChart
            title="Max Temperature"
            data={{
              hourly: {
                time: data.daily.time,
                temperature_2m_max: data.daily.temperature_2m_max,
              },
            }}
            dataKey="temperature_2m_max"
            unit="°C"
          />

          <BaseChart
            title="Min Temperature"
            data={{
              hourly: {
                time: data.daily.time,
                temperature_2m_min: data.daily.temperature_2m_min,
              },
            }}
            dataKey="temperature_2m_min"
            unit="°C"
          />

          <BaseChart
            title="Mean Temperature"
            data={{
              hourly: {
                time: data.daily.time,
                temperature_2m_mean: data.daily.temperature_2m_mean,
              },
            }}
            dataKey="temperature_2m_mean"
            unit="°C"
          />

          <BaseChart
            title="Precipitation Total"
            data={{
              hourly: {
                time: data.daily.time,
                precipitation_sum: data.daily.precipitation_sum,
              },
            }}
            dataKey="precipitation_sum"
            unit="mm"
          />

          <BaseChart
            title="Max Wind Speed"
            data={{
              hourly: {
                time: data.daily.time,
                wind_speed_10m_max: data.daily.wind_speed_10m_max,
              },
            }}
            dataKey="wind_speed_10m_max"
            unit="km/h"
          />
        </>
      ) : (
        <p>No historical data available for selected range</p>
      )}
    </div>
  );
}

export default Historical;