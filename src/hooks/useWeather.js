import { useEffect, useState } from "react";
import { fetchWeather, fetchAirQuality } from "../services/api";

const TTL = 10 * 60 * 1000;

export default function useWeather(lat, lon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (lat == null || lon == null) return;

    const cacheKey = `weather-${lat}-${lon}`;
    const cached = localStorage.getItem(cacheKey);

    async function loadData() {
      try {
        if (cached) {
          const parsed = JSON.parse(cached);

          setData(parsed.data);
          setLoading(false);

          if (Date.now() - parsed.timestamp < TTL) return;
        }

        const [weatherRes, airRes] = await Promise.all([
          fetchWeather(lat, lon),
          fetchAirQuality(lat, lon),
        ]);

        const merged = {
          ...weatherRes,
          air: airRes,
        };

        setData(merged);

        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            data: merged,
            timestamp: Date.now(),
          }),
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [lat, lon]);

  return { data, loading, error };
}
