import React, { useState, useRef } from "react";

export default function TopBar({
  language,
  languageOptions,
  onLanguageChange,
  onLogout,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const lngBtnRef = useRef(null);
  const dropdownRef = useRef(null);

  // Accessibility: close dropdown on outside click or Escape
  React.useEffect(() => {
    function handleClick(e) {
      if (
        dropdownOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !lngBtnRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    }
    function handleEsc(e) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [dropdownOpen]);

  return (
    <header className="topbar" role="banner">
      <div className="topbar__language-dropdown" style={{ position: "relative" }}>
        <button
          ref={lngBtnRef}
          className="language-selector__button"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
          aria-label="Change language"
          onClick={() => setDropdownOpen((o) => !o)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setDropdownOpen(true);
            }
          }}
          tabIndex={0}
        >
          🌐 Language: {language}
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="language-selector__dropdown"
            role="listbox"
            tabIndex={-1}
          >
            {languageOptions.map((lng) => (
              <div
                className="language-selector__item"
                tabIndex={0}
                key={lng.code}
                aria-selected={lng.code === language}
                role="option"
                onClick={() => {
                  onLanguageChange(lng.code);
                  setDropdownOpen(false);
                  lngBtnRef.current?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onLanguageChange(lng.code);
                    setDropdownOpen(false);
                    lngBtnRef.current?.focus();
                  }
                }}
              >
                {lng.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="topbar__logout-btn"
        aria-label="Logout"
        onClick={onLogout}
      >
        Logout
      </button>
    </header>
  );
}
