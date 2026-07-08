import { useEffect, useState } from "react";
import './Sidebar.css';
import {
  MdDashboard,
  MdShoppingCart,
  MdPeople,
  MdMap,
  MdSettings,
  MdChevronLeft
} from "react-icons/md";

const NAV_ITEMS = [
  { id: "overview", title: "Overview", Icon: MdDashboard },
  { id: "orders", title: "Orders", Icon: MdShoppingCart },
  { id: "customers", title: "Customers", Icon: MdPeople },
  { id: "regions", title: "Regions", Icon: MdMap },
  { id: "settings", title: "Settings", Icon: MdSettings }
];

export default function Sidebar({ children, activeId, onNavigate }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 720 : false
  );

  useEffect(() => {
    function handleResize() {
      const mobile = window.innerWidth <= 720;
      setIsMobile(mobile);
      if (!mobile) setIsMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const showLabels = isMobile ? true : !isCollapsed;

  return (
    <div
      className="layout"
      style={{ "--sidebar-width": isCollapsed ? "76px" : "224px" }}
    >
      <button
        type="button"
        className="mobile-menu-toggle"
        onClick={() => setIsMobileOpen(true)}
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>

      <aside
        className={`sidebar ${isCollapsed && !isMobile ? "is-collapsed" : ""} ${
          isMobileOpen ? "is-mobile-open" : ""
        }`}
      >
        <div className="sidebar-inner">
          <div className="sidebar-brand">
            <div className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="20" height="20">
                <path
                  d="M4 24 L12 8 L16 16 L20 10 L28 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {showLabels && (
              <div>
                <h1 className="brand-title">B2B</h1>
                <p className="brand-subtitle">Analytics</p>
              </div>
            )}
            <button
              type="button"
              className="mobile-close"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <nav className="sidebar-nav">
            {NAV_ITEMS.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-item ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileOpen(false);
                  }}
                  title={item.title}
                >
                  <item.Icon size={19} className="nav-icon" />
                  {showLabels && <span className="nav-label">{item.title}</span>}
                  {isActive && <span className="nav-indicator" aria-hidden="true" />}
                </button>
              );
            })}
          </nav>

          {showLabels && (
            <div className="sidebar-footer">
              <button type="button" className="profile-card">
                <span className="profile-avatar">A</span>
                <span className="profile-info">
                  <span className="profile-name">Signed in as:</span>
                  <span className="profile-role">Administrator</span>
                </span>
                <MdSettings size={15} className="profile-settings" />
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          className={`collapse-toggle ${isCollapsed ? "is-collapsed" : ""}`}
          onClick={() => setIsCollapsed((c) => !c)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <MdChevronLeft size={15} />
        </button>
      </aside>

      {isMobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <div className="layout-main">{children}</div>
    </div>
  );
}