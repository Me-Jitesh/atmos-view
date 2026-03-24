import { useEffect, useState } from "react";
import { fetchWeather } from "../services/api";

export default function useWeather(lat, lon) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon) return;

    async function loadWeather() {
      try {
        const res = await fetchWeather(lat, lon);
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, [lat, lon]);

  return { data, loading, error };
}
