import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    const success = (position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    };

    const fail = (err) => {
      console.warn("Geo error:", err.message);

      setLocation({
        latitude: 23.2599,
        longitude: 77.4126,
      });

      setError("Using default location");
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(success, fail, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    });
  }, []);

  return { location, error, loading };
}
