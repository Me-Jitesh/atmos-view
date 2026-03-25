import useGeolocation from "../hooks/useGeolocation";
import useWeather from "../hooks/useWeather";
import TemperatureChart from "../components/charts/TemperatureChart";
import BaseChart from "../components/charts/BaseChart";
import AirQualityChart from "../components/charts/AirQualityChart";

function CurrentWeather() {
  const { location, error: geoError, loading: geoLoading } = useGeolocation();
  const { data, loading, error } = useWeather(
    location.latitude,
    location.longitude,
  );

  if (geoLoading) return <p>Getting location...</p>;
  if (geoError) return <p>{geoError}</p>;

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Current Weather</h2>

      <p>Temperature: {data.current.temperature_2m}°C</p>
      <p>Humidity: {data.current.relative_humidity_2m}%</p>
      <p>UV Index: {data.current.uv_index}</p>
      <p>Wind Speed: {data.current.wind_speed_10m} km/h</p>
      <p>Precipitation: {data.current.precipitation} mm</p>
      <p>PM10: {data.air.hourly.pm10[0]}</p>
      <p>PM2.5: {data.air.hourly.pm2_5[0]}</p>
      <p>CO: {data.air.hourly.carbon_monoxide[0]}</p>
      <p>NO2: {data.air.hourly.nitrogen_dioxide[0]}</p>
      <p>SO2: {data.air.hourly.sulphur_dioxide[0]}</p>
      <p>AQI: {getAQI(data.air.hourly.pm2_5[0])}</p>

      <h2>Charts</h2>

      <TemperatureChart data={data} />

      <BaseChart
        title="Humidity"
        data={data}
        dataKey="relative_humidity_2m"
        unit="%"
      />

      <BaseChart
        title="Precipitation"
        data={data}
        dataKey="precipitation"
        unit="mm"
      />

      <BaseChart title="Visibility" data={data} dataKey="visibility" unit="m" />

      <BaseChart
        title="Wind Speed"
        data={data}
        dataKey="wind_speed_10m"
        unit="km/h"
      />

      <AirQualityChart data={data} />
    </div>
  );
}

function getAQI(pm25) {
  if (pm25 <= 12) return "Good";
  if (pm25 <= 35) return "Moderate";
  if (pm25 <= 55) return "Unhealthy";
  return "Very Unhealthy";
}

export default CurrentWeather;
