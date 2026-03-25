export function filterByDate(data, selectedDate) {
  const target = selectedDate.toISOString().split("T")[0];

  const indices = data.hourly.time
    .map((t, i) => (t.startsWith(target) ? i : -1))
    .filter((i) => i !== -1);

  return {
    time: indices.map((i) => data.hourly.time[i]),
    temperature_2m: indices.map((i) => data.hourly.temperature_2m[i]),
    relative_humidity_2m: indices.map(
      (i) => data.hourly.relative_humidity_2m[i],
    ),
    precipitation: indices.map((i) => data.hourly.precipitation[i]),
    visibility: indices.map((i) => data.hourly.visibility[i]),
    wind_speed_10m: indices.map((i) => data.hourly.wind_speed_10m[i]),
  };
}
