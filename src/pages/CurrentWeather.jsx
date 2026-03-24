import useGeolocation from "../hooks/useGeolocation";

function CurrentWeather() {
  const { location, error, loading } = useGeolocation();

  if (loading) return <p>Fetching location...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Current Weather</h2>
      <p>Latitude: {location.latitude}</p>
      <p>Longitude: {location.longitude}</p>
    </div>
  );
}

export default CurrentWeather;
