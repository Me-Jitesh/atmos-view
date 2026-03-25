import { useEffect, useState } from "react";
import { fetchHistorical } from "../services/api";

export default function useHistorical(lat, lon, startDate, endDate) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!lat || !lon || !startDate || !endDate) return;

    async function load() {
      setLoading(true);
      try {
        const res = await fetchHistorical(lat, lon, startDate, endDate);
        setData(res);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [lat, lon, startDate, endDate]);

  return { data, loading, error };
}
