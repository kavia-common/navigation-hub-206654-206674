import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { menuStructure, getBreadcrumbPath, findMenuItemByPath } from "./menuData";

// Utility: flatten all leaf paths for routing
function collectLeafRoutes(structure, base = "") {
  let routes = [];
  for (const node of structure) {
    if (node.children) {
      routes = routes.concat(collectLeafRoutes(node.children, base + node.path));
    } else {
      routes.push({
        path: (base + node.path).replace(/\/+/g, "/"),
        title: node.label,
        desc: node.desc || "This is a placeholder page.",
        breadcrumb: getBreadcrumbPath(menuStructure, (base + node.path).replace(/\/+/g, "/")),
      });
    }
  }
  return routes;
}

const leafRoutes = collectLeafRoutes(menuStructure);

const languageOptions = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
  { code: "DE", label: "Deutsch" },
];

export default function App() {
  // i18n: in-memory state
  const [lng, setLng] = useState("EN");
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Find current route match for breadcrumbs
  const currentLeaf = leafRoutes.find((r) =>
    location.pathname === r.path ||
    (location.pathname.endsWith("/") ? location.pathname.slice(0, -1) === r.path : false)
  );

  // Breadcrumbs
  const breadcrumb = currentLeaf?.breadcrumb || [];

  // Content: fallback 404
  const MainContent = () =>
    currentLeaf ? (
      <div className="content__inner" tabIndex={0}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          {breadcrumb.map((b, idx) => (
            <div key={b.path} className="breadcrumb__item">
              {b.label}
            </div>
          ))}
        </nav>
        <div className="page__title">{currentLeaf.title}</div>
        <div className="page__desc">{currentLeaf.desc}</div>
      </div>
    ) : (
      <div className="content__inner" tabIndex={0}>
        <div className="page__title" style={{color: "#ef4444"}}>Page Not Found</div>
        <div className="page__desc">The page does not exist in this router UI.</div>
      </div>
    );

  function handleLanguageChange(code) {
    setLng(code);
  }

  function handleLogout() {
    alert("You have been logged out (stub; implement backend call as needed).");
  }

  // Accessibility: keyboard toggle for sidebar (placeholder for future)
  // window.addEventListener("keydown", ...)

  return (
    <div className="layout__container">
      <Sidebar
        open={isSidebarOpen}
        menu={menuStructure}
        locationPath={location.pathname}
        onMenuNavigate={navPath => navigate(navPath)}
      />
      <div className="main-content" role="main">
        <TopBar
          language={lng}
          languageOptions={languageOptions}
          onLanguageChange={handleLanguageChange}
          onLogout={handleLogout}
        />
        <Routes>
          {leafRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<MainContent />}
            />
          ))}
          <Route path="*" element={<MainContent />} />
        </Routes>
      </div>
    </div>
  );
}
