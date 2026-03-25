import { MapPinIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Landing({ onNavigate }) {
  const navigate = useNavigate();

  return (
    <div
      className="container"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <img
        src="/logo.png"
        alt="Atmos View"
        style={{ width: 350, height: 350 }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          color: "#64748b",
          fontSize: "0.9rem",
        }}
      >
        <MapPinIcon style={{ width: 16 }} />
        <h3>Real-Time and Historical Weather Insights</h3>
      </div>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1.5rem",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button className="btn" onClick={() => navigate("/current")}>
          Current Weather
        </button>

        <button className="btn" onClick={() => navigate("/historical")}>
          Historical Trends
        </button>
      </div>
    </div>
  );
}

export default Landing;
