import React, { useState, useEffect, useRef } from "react";
import { findMenuItemByPath } from "../menuData";

function isDescendantOfActive(item, activePath, base = "") {
  const fullPath = (base + (item.path || "")).replace(/\/+/g, "/");
  if (activePath === fullPath) return true;
  if (item.children) {
    return item.children.some((child) =>
      isDescendantOfActive(child, activePath, fullPath)
    );
  }
  return false;
}

function SidebarMenu({ menu, locationPath, expanded, setExpanded, nav, basePath = "" }) {
  return (
    <nav className="sidebar__menu" role="navigation" aria-label="Main navigation">
      {menu.map((item, idx) => {
        const fullPath = (basePath + (item.path || "")).replace(/\/+/g, "/");
        const isActive = locationPath === fullPath;
        const hasChildren = !!item.children;
        const expandedHere = expanded[fullPath] ?? false;
        const isAncestor = isDescendantOfActive(item, locationPath, basePath);

        return (
          <div className="menu__section" key={item.label + idx}>
            {item.heading && (
              <div className="menu__section__label">{item.heading}</div>
            )}
            <button
              className={`menu__item${isActive ? " active" : ""}${hasChildren ? "" : " menu__item--leaf"}`}
              data-active={isActive}
              aria-current={isActive ? "page" : undefined}
              aria-haspopup={hasChildren ? "tree" : undefined}
              aria-expanded={hasChildren ? expandedHere : undefined}
              tabIndex={0}
              style={{
                fontWeight: isActive || isAncestor ? 700 : undefined,
                color: isActive || isAncestor ? "var(--color-primary)" : undefined,
              }}
              onClick={() => {
                if (hasChildren) {
                  setExpanded((prev) => ({
                    ...prev,
                    [fullPath]: !prev[fullPath],
                  }));
                } else {
                  nav(fullPath);
                }
              }}
              onKeyDown={(e) => {
                if (hasChildren && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  setExpanded((prev) => ({
                    ...prev,
                    [fullPath]: !prev[fullPath],
                  }));
                } else if (!hasChildren && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  nav(fullPath);
                }
              }}
            >
              {item.icon && (
                <span
                  className="menu__item__icon"
                  aria-hidden="true"
                  style={{ marginRight: "0.65rem" }}
                >
                  {item.icon}
                </span>
              )}
              {item.label}
              {hasChildren && (
                <span
                  className="menu__item__expand-icon"
                  data-expanded={expandedHere}
                  aria-hidden="true"
                  style={{
                    marginLeft: "auto",
                    rotate: expandedHere ? "90deg" : "0deg",
                    transition: "transform var(--transition)"
                  }}
                >
                  ▶
                </span>
              )}
            </button>
            {hasChildren && expandedHere && (
              <div
                className={`menu__item__nested menu__item__level-${(item.level || 1) + 1}`}
                aria-label={`${item.label} subitems`}
                style={{
                  marginTop: "2px",
                  borderLeft: "2px solid #dbeafe",
                  paddingLeft: "0.2rem",
                  animation: "fadeIn .12s"
                }}
              >
                <SidebarMenu
                  menu={item.children}
                  locationPath={locationPath}
                  expanded={expanded}
                  setExpanded={setExpanded}
                  nav={nav}
                  basePath={fullPath}
                />
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ menu, locationPath, onMenuNavigate }) {
  // Persist expanded state in memory
  const [expanded, setExpanded] = useState(() => {
    let initial = {};
    // Expand home by default
    if (menu && menu.length && menu[0].children) {
      initial[menu[0].path] = true;
    }
    return initial;
  });

  // Expand ancestor nodes of the active path
  useEffect(() => {
    function expandAncestors(node, path = "") {
      const fullPath = (path + (node.path || "")).replace(/\/+/g, "/");
      if (node.children) {
        for (const child of node.children) {
          if (isDescendantOfActive(child, locationPath, fullPath)) {
            setExpanded((prev) => ({ ...prev, [fullPath]: true }));
            expandAncestors(child, fullPath);
          }
        }
      }
    }
    menu.forEach((item) => expandAncestors(item, ""));
  }, [locationPath]);

  return (
    <aside className="sidebar" aria-label="Sidebar">
      <div className="sidebar__header" tabIndex={0}>
        Router UI
      </div>
      <SidebarMenu
        menu={menu}
        locationPath={locationPath}
        expanded={expanded}
        setExpanded={setExpanded}
        nav={onMenuNavigate}
      />
    </aside>
  );
}
