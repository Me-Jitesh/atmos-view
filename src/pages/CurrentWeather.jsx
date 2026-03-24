import useGeolocation from "../hooks/useGeolocation";
import useWeather from "../hooks/useWeather";

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
    </div>
  );
}

export default CurrentWeather;
