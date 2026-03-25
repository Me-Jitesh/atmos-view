import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BaseChart({
  title,
  data,
  dataKey,
  color = "#8884d8",
  unit = "",
  transform = (v) => v,
}) {
  const [range, setRange] = useState([0, 24]);

  const chartData = data.hourly.time
    .slice(range[0], range[1])
    .map((time, index) => ({
      time: time.slice(11, 16),
      value: transform(data.hourly[dataKey][index + range[0]]),
    }));

  if (!data?.hourly?.time || data.hourly.time.length === 0) {
    return <p>No data available for selected date</p>;
  }

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>{title}</h3>

      {/* Zoom Controls */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
        <button className="btn" onClick={() => setRange([0, 12])}>
          0–12h
        </button>
        <button className="btn" onClick={() => setRange([12, 24])}>
          12–24h
        </button>
        <button className="btn" onClick={() => setRange([0, 24])}>
          Full
        </button>
      </div>

      <div style={{ width: "100%", overflowX: "auto" }}>
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(v) => `${v} ${unit}`} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />{" "}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default BaseChart;
