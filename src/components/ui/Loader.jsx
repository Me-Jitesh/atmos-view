function Loader({ label = "Loading..." }) {
  return (
    <div
      style={{
        height: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.8rem",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "3px solid #e2e8f0",
          borderTop: "3px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 0.8s linear infinite",
        }}
      />

      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>{label}</span>
    </div>
  );
}

export default Loader;
