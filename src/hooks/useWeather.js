import { useEffect, useState } from "react";
import { fetchWeather, fetchAirQuality } from "../services/api";

export default function useWeather(lat, lon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function loadData() {
      try {
        const [weatherRes, airRes] = await Promise.all([
          fetchWeather(lat, lon),
          fetchAirQuality(lat, lon),
        ]);

        const merged = {
          ...weatherRes,
          air: airRes,
        };

        setData(merged);
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
