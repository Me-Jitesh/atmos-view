import { useState } from "react";

import useGeolocation from "../hooks/useGeolocation";
import useWeather from "../hooks/useWeather";

import DateSelector from "../components/DateSelector";
import TemperatureChart from "../components/charts/TemperatureChart";
import BaseChart from "../components/charts/BaseChart";
import AirQualityChart from "../components/charts/AirQualityChart";
import Chip from "../components/ui/Chip";
import Loader from "../components/ui/Loader";

import { filterByDate } from "../utils/format";

function CurrentWeather() {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();

  const { data, loading, error } = useWeather(
    location.latitude,
    location.longitude,
  );

  const [selectedDate, setSelectedDate] = useState(new Date());

  if (geoLoading) return <Loader label="Detecting location..." />;
  if (geoError) return <p>Error: {geoError}</p>;

  if (loading) return <Loader label="Loading wheather data..." />;
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

  function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return (
    <div className="container">
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="grid-chips section">
        <Chip label="Temp" value={`${data.current.temperature_2m}°C`} />
        <Chip
          label="Humidity"
          value={`${data.current.relative_humidity_2m}%`}
        />
        <Chip label="Wind" value={`${data.current.wind_speed_10m} km/h`} />
        <Chip label="UV" value={data.current.uv_index} />
        <Chip label="PM2.5" value={data.air.hourly.pm2_5[0]} />
        <Chip label="PM10" value={data.air.hourly.pm10[0]} />
      </div>

      {dayIndex !== -1 && (
        <div className="card section">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem 1rem",
              fontSize: "0.9rem",
            }}
          >
            <div>Min: {data.daily.temperature_2m_min[dayIndex]}°C</div>
            <div>Max: {data.daily.temperature_2m_max[dayIndex]}°C</div>

            <div>🌅 {formatTime(data.daily.sunrise[dayIndex])}</div>
            <div>🌇 {formatTime(data.daily.sunset[dayIndex])}</div>
          </div>
        </div>
      )}

      <div className="grid-charts section">
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
            title="Wind"
            data={{ hourly: filteredHourly }}
            dataKey="wind_speed_10m"
            unit="km/h"
          />
        </div>

        <div className="card">
          <BaseChart
            title="Precipitation"
            data={{ hourly: filteredHourly }}
            dataKey="precipitation"
            unit="mm"
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
