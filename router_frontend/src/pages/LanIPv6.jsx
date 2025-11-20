import React, { useState } from "react";
import { Tabs, ToggleSwitch, Button, FormRow, ActionsRight } from "../components/ui";

// PUBLIC_INTERFACE
export default function LanIPv6() {
  /** LAN IPv6 Configuration page implementing design specs. */
  const [activeTab, setActiveTab] = useState("ipv6");
  const [dhcpv6On, setDhcpv6On] = useState(true);
  const [autoCfg, setAutoCfg] = useState("slaac");
  const [dnsMode, setDnsMode] = useState("auto");

  const tabs = [
    { key: "ipv4", label: "IPv4 Configuration" },
    { key: "ipv6", label: "IPv6 Configuration" },
  ];

  return (
    <div className="content__inner" tabIndex={0}>
      <div className="breadcrumb" aria-label="Breadcrumb">
        <div className="breadcrumb__item">Basic Setup</div>
        <div className="breadcrumb__item">LAN</div>
      </div>
      <div className="page__title" style={{ color: "var(--text-primary, var(--color-primary))" }}>LAN</div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} ariaLabel="LAN IP version tabs" />

      {activeTab === "ipv4" ? (
        <div className="info-note" role="note" style={{ marginTop: 16 }}>
          You are on the IPv4 tab. Use the left menu "Basic Setup > LAN > IPv4 Configuration" for full IPv4 page.
        </div>
      ) : null}

      <section className="card">
        <div className="group group--header">
          <h3 className="group-title">Enable DHCP IPv6 Server</h3>
          <ToggleSwitch id="dhcpv6" checked={dhcpv6On} onChange={setDhcpv6On} />
        </div>

        <div className="group">
          <FormRow label="Auto Configuration Mode" htmlFor="auto-cfg">
            <select
              id="auto-cfg"
              className="input select"
              value={autoCfg}
              onChange={(e) => setAutoCfg(e.target.value)}
            >
              <option value="slaac">Stateless Address Autoconfiguration – Router Advertisement (SLAAC)</option>
              <option value="stateful">Stateful (DHCPv6)</option>
              <option value="mixed">SLAAC + DHCPv6 (Mixed)</option>
            </select>
          </FormRow>

          <FormRow label="DNS Mode" htmlFor="dns-mode">
            <div className="radio-inline" role="radiogroup" aria-label="DNS Mode">
              <label className="radio">
                <input
                  type="radio"
                  name="dns6"
                  checked={dnsMode === "auto"}
                  onChange={() => setDnsMode("auto")}
                />
                <span>Automatic</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="dns6"
                  checked={dnsMode === "manual"}
                  onChange={() => setDnsMode("manual")}
                />
                <span>Manual</span>
              </label>
            </div>
          </FormRow>
        </div>

        <ActionsRight>
          <Button variant="secondary" aria-label="Cancel">Cancel</Button>
          <Button variant="primary" aria-label="Apply" style={{ marginLeft: 10 }}>
            Apply
          </Button>
        </ActionsRight>
      </section>
    </div>
  );
}

