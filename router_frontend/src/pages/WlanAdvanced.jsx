import React, { useState } from "react";
import { Tabs, ToggleSwitch, Divider, Button, FormRow, TwoCol, ActionsRight } from "../components/ui";

// PUBLIC_INTERFACE
export default function WlanAdvanced() {
  /** WLAN Advanced settings with per-band panels matching design. */
  const [activeTab, setActiveTab] = useState("advanced");

  // 2.4G states
  const [g24, setG24] = useState(true);
  const [g24_bss, setG24Bss] = useState("enable");
  const [g24_nr, setG24Nr] = useState("enable");
  const [g24_rssi, setG24Rssi] = useState("-75");
  const [g24_ft, setG24Ft] = useState("enable");

  // 5G states
  const [g5, setG5] = useState(true);
  const [g5_bss, setG5Bss] = useState("enable");
  const [g5_nr, setG5Nr] = useState("enable");
  const [g5_rssi, setG5Rssi] = useState("-75");
  const [g5_ft, setG5Ft] = useState("enable");

  // 6G states
  const [g6, setG6] = useState(true);
  const [g6_bss, setG6Bss] = useState("enable");
  const [g6_nr, setG6Nr] = useState("enable");
  const [g6_ft, setG6Ft] = useState("enable");
  const [g6_ofdma, setG6Ofdma] = useState(false);

  const wlanTabs = [
    { key: "basic", label: "Basic Setup" },
    { key: "advanced", label: "Advanced" },
    { key: "wps", label: "WPS / EasyMesh" },
    { key: "wmm", label: "WMM / EDCA" },
    { key: "rate", label: "Rate Limit" },
    { key: "station", label: "Station Control" },
  ];

  function Panel({ title, enabled, setEnabled, model }) {
    return (
      <section className="panel">
        <div className="panel-head">
          <h4 className="panel-title">{title}</h4>
          <ToggleSwitch id={`${title}-toggle`} checked={enabled} onChange={setEnabled} />
        </div>
        {enabled && (
          <div className="panel-grid">
            <TwoCol>
              <FormRow label="BSS Transition Management (11v)">
                <select className="input select" value={model.bss.v} onChange={(e) => model.bss.set(e.target.value)}>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </FormRow>
              <FormRow label="Neighbor Report (11k)">
                <select className="input select" value={model.nr.v} onChange={(e) => model.nr.set(e.target.value)}>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </FormRow>
              <FormRow label="RSSI Threshold (dBm)">
                <input className="input" placeholder="-75" value={model.rssi.v} onChange={(e) => model.rssi.set(e.target.value)} />
              </FormRow>
              <FormRow label="802.11r Fast Transition">
                <select className="input select" value={model.ft.v} onChange={(e) => model.ft.set(e.target.value)}>
                  <option value="enable">Enable</option>
                  <option value="disable">Disable</option>
                </select>
              </FormRow>
            </TwoCol>
            {model.ofdma && (
              <div className="form-row">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ToggleSwitch
                    id={`${title}-ofdma`}
                    checked={model.ofdma.v}
                    onChange={model.ofdma.set}
                    labelRight
                    label="OFDMA"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    );
  }

  return (
    <div className="content__inner" tabIndex={0}>
      <div className="breadcrumb" aria-label="Breadcrumb">
        <div className="breadcrumb__item">WLAN</div>
        <div className="breadcrumb__item">Advanced</div>
      </div>
      <div className="page__title" style={{ color: "var(--text-primary, var(--color-primary))" }}>WLAN</div>

      <Tabs tabs={wlanTabs} active={activeTab} onChange={setActiveTab} ariaLabel="WLAN tabs" />

      <section className="card">
        <Panel
          title="2.4G Wireless Settings"
          enabled={g24}
          setEnabled={setG24}
          model={{
            bss: { v: g24_bss, set: setG24Bss },
            nr: { v: g24_nr, set: setG24Nr },
            rssi: { v: g24_rssi, set: setG24Rssi },
            ft: { v: g24_ft, set: setG24Ft },
          }}
        />
        <Divider />
        <Panel
          title="5G Wireless Settings"
          enabled={g5}
          setEnabled={setG5}
          model={{
            bss: { v: g5_bss, set: setG5Bss },
            nr: { v: g5_nr, set: setG5Nr },
            rssi: { v: g5_rssi, set: setG5Rssi },
            ft: { v: g5_ft, set: setG5Ft },
          }}
        />
        <Divider />
        <Panel
          title="6G Wireless Settings"
          enabled={g6}
          setEnabled={setG6}
          model={{
            bss: { v: g6_bss, set: setG6Bss },
            nr: { v: g6_nr, set: setG6Nr },
            rssi: { v: "-75", set: () => {} },
            ft: { v: g6_ft, set: setG6Ft },
            ofdma: { v: g6_ofdma, set: setG6Ofdma },
          }}
        />

        <ActionsRight center>
          <Button variant="secondary" aria-label="Cancel">Cancel</Button>
          <Button variant="primary" aria-label="Save" style={{ marginLeft: 12 }}>
            Save
          </Button>
        </ActionsRight>
      </section>
    </div>
  );
}

