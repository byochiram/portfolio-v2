export default function Loading() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      background: "var(--bg, #f8f7fb)",
    }}>
      <div style={{
        width: 32,
        height: 32,
        border: "3px solid rgba(118,85,246,.2)",
        borderTopColor: "#7655f6",
        borderRadius: "50%",
        animation: "spin .6s linear infinite",
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  );
}
