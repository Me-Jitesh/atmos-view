import { MapPinIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container landing-root">
      <img src="/logo.png" alt="Atmos View" className="landing-logo" />

      <div className="landing-subtitle">
        <MapPinIcon style={{ width: 16 }} />
        <span>Real Time & Historical Weather Insights</span>
      </div>

      <div className="landing-actions">
        <button className="btn btn-pill" onClick={() => navigate("/current")}>
          Current Weather
        </button>

        <button
          className="btn btn-pill"
          onClick={() => navigate("/historical")}
        >
          Historical Trends
        </button>
      </div>
    </div>
  );
}

export default Landing;
