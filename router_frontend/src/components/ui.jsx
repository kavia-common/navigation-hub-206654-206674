import React from "react";

/**
 * Shared UI components and form primitives styled per Ocean Professional and assets style guide.
 * Includes Tabs, ToggleSwitch, FormRow, Buttons, Divider.
 */

// Helpers
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

// PUBLIC_INTERFACE
export function Tabs({ tabs, active, onChange, ariaLabel = "Tabs" }) {
  /** Render underline tabs with Ocean Professional active indicator. */
  return (
    <nav className="tabs" role="tablist" aria-label={ariaLabel}>
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={isActive}
            aria-controls={t.ariaControls || undefined}
            id={t.id || `tab-${t.key}`}
            className={cx("tab", isActive && "tab--active")}
            onClick={() => onChange?.(t.key)}
          >
            {t.label}
          </button>
        );
      })}
    </nav>
  );
}

// PUBLIC_INTERFACE
export function ToggleSwitch({ checked, onChange, id, label, labelRight = false }) {
  /** Accessible toggle switch */
  return (
    <div className="toggle">
      {!labelRight && label && (
        <label className="label" htmlFor={id} style={{ marginRight: 12 }}>
          {label}
        </label>
      )}
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={!!checked}
        className={cx("toggle__track", checked && "on")}
        onClick={() => onChange?.(!checked)}
      >
        <span className={cx("toggle__thumb", checked && "on")} />
      </button>
      {labelRight && label && (
        <label className="label" htmlFor={id} style={{ marginLeft: 12 }}>
          {label}
        </label>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
export function Divider({ space = 20 }) {
  return <hr className="divider" style={{ margin: `${space}px 0` }} />;
}

// PUBLIC_INTERFACE
export function Button({ children, variant = "primary", ...props }) {
  /** Button with primary/secondary variants */
  return (
    <button
      {...props}
      className={cx(
        "btn",
        variant === "primary" ? "btn--primary" : "btn--secondary",
        props.className
      )}
    >
      {children}
    </button>
  );
}

// PUBLIC_INTERFACE
export function FormRow({ label, htmlFor, children, inline = false, helper }) {
  /** Generic form row with label above control. */
  return (
    <div className={cx("form-row", inline && "form-row--inline")}>
      {label && (
        <label className="form-label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      <div className="form-control">{children}</div>
      {helper && <div className="form-helper">{helper}</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export function TwoCol({ children }) {
  /** Two column grid that collapses on small screens */
  return <div className="grid-2col">{children}</div>;
}

// PUBLIC_INTERFACE
export function ActionsRight({ children, center = false }) {
  return <div className={cx("actions", center && "actions--center")}>{children}</div>;
}

