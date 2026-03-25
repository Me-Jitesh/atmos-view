import { useState } from "react";

import useGeolocation from "../hooks/useGeolocation";
import useHistorical from "../hooks/useHistorical";
import DateRangeSelector from "../components/DateRangeSelector";
import BaseChart from "../components/charts/BaseChart";
import Loader from "../components/ui/Loader";
import Chip from "../components/ui/Chip";

function formatDate(date) {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
}

function Historical() {
  const { location, loading: geoLoading, error: geoError } = useGeolocation();

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
    range.end,
  );

  if (geoLoading) return <Loader label="Getting your location..." />;
  if (geoError) return <p>Error: {geoError}</p>;

  if (loading) return <Loader label="Loading historical trends..." />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <h2 className="title">HISTORICAL TRENDS</h2>

      <DateRangeSelector setRange={setRange} />

      {data && data.daily && (
        <>
          <div className="grid-chips section">
            <Chip
              label="Avg Temp"
              value={`${Math.round(
                data.daily.temperature_2m_mean.reduce((a, b) => a + b, 0) /
                  data.daily.temperature_2m_mean.length,
              )}°C`}
            />
            <Chip
              label="Max Wind"
              value={`${Math.max(...data.daily.wind_speed_10m_max)} km/h`}
            />
            <Chip
              label="Rain Total"
              value={`${data.daily.precipitation_sum.reduce((a, b) => a + b, 0)} mm`}
            />
          </div>

          <div className="grid-charts section">
            <div className="card">
              <BaseChart
                title="Max Temp"
                data={{
                  hourly: {
                    time: data.daily.time,
                    temperature_2m_max: data.daily.temperature_2m_max,
                  },
                }}
                dataKey="temperature_2m_max"
                unit="°C"
              />
            </div>

            <div className="card">
              <BaseChart
                title="Min Temp"
                data={{
                  hourly: {
                    time: data.daily.time,
                    temperature_2m_min: data.daily.temperature_2m_min,
                  },
                }}
                dataKey="temperature_2m_min"
                unit="°C"
              />
            </div>

            <div className="card">
              <BaseChart
                title="Precipitation"
                data={{
                  hourly: {
                    time: data.daily.time,
                    precipitation_sum: data.daily.precipitation_sum,
                  },
                }}
                dataKey="precipitation_sum"
                unit="mm"
              />
            </div>

            <div className="card">
              <BaseChart
                title="Wind Speed"
                data={{
                  hourly: {
                    time: data.daily.time,
                    wind_speed_10m_max: data.daily.wind_speed_10m_max,
                  },
                }}
                dataKey="wind_speed_10m_max"
                unit="km/h"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Historical;
