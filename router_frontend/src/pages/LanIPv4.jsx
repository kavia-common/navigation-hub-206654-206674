import React, { useState } from "react";
import { Tabs, ToggleSwitch, Divider, Button, FormRow, TwoCol, ActionsRight } from "../components/ui";

// PUBLIC_INTERFACE
export default function LanIPv4() {
  /** LAN IPv4 Configuration page implementing design specs with tabs and sections. */
  const [activeTab, setActiveTab] = useState("ipv4");
  const [dnsMode, setDnsMode] = useState("auto");
  const [dhcpOn, setDhcpOn] = useState(true);

  // Field states (stub)
  const [ipAddress, setIpAddress] = useState("");
  const [subnetMask, setSubnetMask] = useState("");
  const [gateway, setGateway] = useState("");
  const [poolStart, setPoolStart] = useState("");
  const [poolEnd, setPoolEnd] = useState("");
  const [leaseTime, setLeaseTime] = useState("");

  const tabs = [
    { key: "ipv4", label: "IPv4 Configuration" },
    { key: "ipv6", label: "IPv6 Configuration" },
  ];

  function handleGetFromNat() {
    // Stub interaction
    // In real app, fetch NAT info then set start/end accordingly
    setPoolStart("192.168.1.100");
    setPoolEnd("192.168.1.199");
  }

  return (
    <div className="content__inner" tabIndex={0}>
      <div className="breadcrumb" aria-label="Breadcrumb">
        <div className="breadcrumb__item">Basic Setup</div>
        <div className="breadcrumb__item">LAN</div>
      </div>
      <div className="page__title" style={{ color: "var(--text-primary, var(--color-primary))" }}>LAN</div>

      <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} ariaLabel="LAN IP version tabs" />

      {activeTab === "ipv6" ? (
        <div className="info-note" role="note" style={{ marginTop: 16 }}>
          You are on the IPv6 tab. Use the left menu "Basic Setup > LAN > IPv6 Configuration" for full IPv6 page.
        </div>
      ) : null}

      <section className="card">
        <h3 className="group-title">IP Address</h3>
        <div className="group">
          <FormRow label="IP Address" htmlFor="lan-ip">
            <input
              id="lan-ip"
              className="input"
              placeholder="192.168.1.1"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
          </FormRow>
          <FormRow label="Subnet Mask" htmlFor="lan-mask">
            <input
              id="lan-mask"
              className="input"
              placeholder="255.255.255.0"
              value={subnetMask}
              onChange={(e) => setSubnetMask(e.target.value)}
            />
          </FormRow>
          <FormRow label="Gateway" htmlFor="lan-gw">
            <input
              id="lan-gw"
              className="input"
              placeholder="192.168.1.254"
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
            />
          </FormRow>
        </div>

        <h3 className="group-title" style={{ marginTop: 20 }}>DNS Mode</h3>
        <div className="group">
          <div className="radio-inline" role="radiogroup" aria-label="DNS Mode">
            <label className="radio">
              <input
                type="radio"
                name="dns"
                checked={dnsMode === "auto"}
                onChange={() => setDnsMode("auto")}
              />
              <span>Auto DNS</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="dns"
                checked={dnsMode === "isp"}
                onChange={() => setDnsMode("isp")}
              />
              <span>Use ISP DNS</span>
            </label>
            <label className="radio">
              <input
                type="radio"
                name="dns"
                checked={dnsMode === "manual"}
                onChange={() => setDnsMode("manual")}
              />
              <span>Use Manual</span>
            </label>
          </div>
        </div>

        <Divider />

        <div className="group group--header">
          <h3 className="group-title">DHCP</h3>
          <ToggleSwitch
            id="dhcp-toggle"
            checked={dhcpOn}
            onChange={setDhcpOn}
          />
        </div>

        {dhcpOn && (
          <div className="group">
            <TwoCol>
              <FormRow label="Start IP Address" htmlFor="pool-start">
                <input
                  id="pool-start"
                  className="input"
                  placeholder="192.168.1.100"
                  value={poolStart}
                  onChange={(e) => setPoolStart(e.target.value)}
                />
              </FormRow>
              <FormRow label="End IP Address" htmlFor="pool-end">
                <input
                  id="pool-end"
                  className="input"
                  placeholder="192.168.1.199"
                  value={poolEnd}
                  onChange={(e) => setPoolEnd(e.target.value)}
                />
              </FormRow>
            </TwoCol>
            <FormRow label="Lease Time (hours)" htmlFor="lease-time">
              <input
                id="lease-time"
                className="input"
                placeholder="24"
                value={leaseTime}
                onChange={(e) => setLeaseTime(e.target.value)}
              />
            </FormRow>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 12 }}>
              <Button variant="secondary" onClick={handleGetFromNat}>
                Get from NAT address
              </Button>
            </div>
          </div>
        )}

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

