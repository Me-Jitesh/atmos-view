import { useState } from "react";
import BaseChart from "./BaseChart";

function TemperatureChart({ data }) {
  const [unit, setUnit] = useState("C");

  const convertTemp = (temp) => (unit === "C" ? temp : (temp * 9) / 5 + 32);

  return (
    <div>
      <button
        className="btn btn-toggle"
        onClick={() => setUnit(unit === "C" ? "F" : "C")}
      >
        Switch to °{unit === "C" ? "F" : "C"}
      </button>

      <BaseChart
        title="Temperature"
        data={data}
        dataKey="temperature_2m"
        unit={`°${unit}`}
        transform={convertTemp}
      />
    </div>
  );
}

export default TemperatureChart;
