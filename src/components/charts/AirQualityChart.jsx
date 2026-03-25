import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function AirQualityChart({ data }) {
  const chartData = data.air.hourly.time.map((time, i) => ({
    time: time.slice(11, 16),
    pm10: data.air.hourly.pm10[i],
    pm25: data.air.hourly.pm2_5[i],
  }));

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <div style={{ width: 800, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pm10" stroke="#ff7300" />
            <Line type="monotone" dataKey="pm25" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default AirQualityChart;
