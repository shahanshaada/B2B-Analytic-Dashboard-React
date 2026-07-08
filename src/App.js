import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar.jsx";
import Overview from "./components/Overview.jsx";
import "./App.css";

function ComingSoon({ label }) {
  return (
    <div className="coming-soon">
      <h2>{label}</h2>
      <p>This section is coming soon.</p>
    </div>
  );
}

export default function App() {
  const [activeId, setActiveId] = useState("overview");

  function renderContent() {
    switch (activeId) {
      case "overview":
        return <Overview />;
      case "orders":
        return <ComingSoon label="Orders" />;
      case "customers":
        return <ComingSoon label="Customers" />;
      case "regions":
        return <ComingSoon label="Regions" />;
      case "settings":
        return <ComingSoon label="Settings" />;
      default:
        return null;
    }
  }

  return (
    <Sidebar activeId={activeId} onNavigate={setActiveId}>
      <main className="content">{renderContent()}</main>
    </Sidebar>
  );
}
