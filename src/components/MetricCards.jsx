const metrics = [
  { label: "Revenue", value: "$84,250" },
  { label: "Orders", value: "1,926" },
  { label: "Visitors", value: "48,310" },
  { label: "Conversion Rate", value: "3.98%" }
];

export default function MetricCards() {
  return (
    <div className="cards-row">
      {metrics.map((m) => (
        <div className="card" key={m.label}>
          <p className="card-label">{m.label}</p>
          <h2 className="card-value">{m.value}</h2>
        </div>
      ))}
    </div>
  );
}
