import {
  SunIcon,
  CloudIcon,
  BoltIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

const icons = {
  temp: SunIcon,
  humidity: CloudIcon,
  wind: BoltIcon,
  uv: FireIcon,
};

function MetricCard({ label, value, type }) {
  const Icon = icons[type] || SunIcon;

  return (
    <div className="card">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span className="subtitle">{label}</span>
        <Icon style={{ width: 20 }} />
      </div>
      <div className="value">{value}</div>
    </div>
  );
}

export default MetricCard;
