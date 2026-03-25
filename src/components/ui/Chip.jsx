function Chip({ label, value }) {
  return (
    <div
      style={{
        padding: "6px 10px",
        borderRadius: "999px",
        background: "#e0f2fe",
        color: "#0369a1",
        fontSize: "0.75rem",
        display: "flex",
        gap: "4px",
        alignItems: "center",
      }}
    >
      <span style={{ opacity: 0.8 }}>{label}:</span>
      <strong>{value}</strong>
    </div>
  );
}

export default Chip;
