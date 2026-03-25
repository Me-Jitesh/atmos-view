const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";
const ARCHIVE_URL = "https://archive-api.open-meteo.com/v1/archive";

export async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,

    // current weather
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "uv_index",
      "precipitation",
      "wind_speed_10m",
    ].join(","),

    // hourly data
    hourly: [
      "temperature_2m",
      "relative_humidity_2m",
      "precipitation",
      "visibility",
      "wind_speed_10m",
      "pm10",
      "pm2_5",
    ].join(","),

    // daily data
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
      "precipitation_probability_max",
      "wind_speed_10m_max",
    ].join(","),

    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  return response.json();
}

export async function fetchAirQuality(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,

    hourly: [
      "pm10",
      "pm2_5",
      "carbon_monoxide",
      "nitrogen_dioxide",
      "sulphur_dioxide",
      "ozone",
    ].join(","),

    timezone: "auto",
  });

  const response = await fetch(`${AIR_QUALITY_URL}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch air quality data");
  }

  return response.json();
}

export async function fetchHistorical(lat, lon, start, end) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,

    start_date: start,
    end_date: end,

    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "temperature_2m_mean",
      "sunrise",
      "sunset",
      "precipitation_sum",
      "wind_speed_10m_max",
      "wind_direction_10m_dominant",
    ].join(","),

    timezone: "auto",
  });

  const res = await fetch(`${ARCHIVE_URL}?${params}`);

  if (!res.ok) throw new Error("Historical fetch failed");

  return res.json();
}
