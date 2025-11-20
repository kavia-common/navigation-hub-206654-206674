import React, { useState } from "react";
import { ToggleSwitch, Divider, Button, FormRow, ActionsRight } from "../components/ui";

// PUBLIC_INTERFACE
export default function Wan() {
  /** WAN configuration matching design sections and interactions. */
  const [enabled, setEnabled] = useState(true);
  const [proto, setProto] = useState("ipv4");
  const [connType, setConnType] = useState("dhcp");
  const [wanAddrMode, setWanAddrMode] = useState("dhcp");
  const [pinEnable, setPinEnable] = useState(true);
  const [pin, setPin] = useState("");
  const [mtu, setMtu] = useState("1500");
  const [natOn, setNatOn] = useState(true);

  return (
    <div className="content__inner" tabIndex={0}>
      <div className="breadcrumb" aria-label="Breadcrumb">
        <div className="breadcrumb__item">Basic Setup</div>
        <div className="breadcrumb__item">WAN</div>
      </div>
      <div className="page__title" style={{ color: "var(--text-primary, var(--color-primary))" }}>WAN</div>

      <section className="card">
        <div className="group group--header">
          <h3 className="group-title">Enable</h3>
          <ToggleSwitch id="wan-enable" checked={enabled} onChange={setEnabled} />
        </div>

        <Divider />

        <h3 className="group-title">Connection Configuration</h3>
        <div className="group">
          <FormRow label="IP Protocol Type">
            <div className="radio-inline" role="radiogroup" aria-label="IP Protocol Type">
              <label className="radio">
                <input type="radio" name="proto" checked={proto === "ipv4"} onChange={() => setProto("ipv4")} />
                <span>IPv4</span>
              </label>
              <label className="radio">
                <input type="radio" name="proto" checked={proto === "ipv6"} onChange={() => setProto("ipv6")} />
                <span>IPv6</span>
              </label>
              <label className="radio">
                <input type="radio" name="proto" checked={proto === "dual"} onChange={() => setProto("dual")} />
                <span>IPv4/IPv6</span>
              </label>
            </div>
          </FormRow>

          <FormRow label="Connection Type" htmlFor="conn-type">
            <select
              id="conn-type"
              className="input select"
              value={connType}
              onChange={(e) => setConnType(e.target.value)}
            >
              <option value="dhcp">DHCP</option>
              <option value="static">Static</option>
              <option value="pppoe">PPPoE</option>
            </select>
          </FormRow>

          <FormRow label="Get WAN Address">
            <div className="radio-inline" role="radiogroup" aria-label="Get WAN Address">
              <label className="radio">
                <input type="radio" name="addr" checked={wanAddrMode === "dhcp"} onChange={() => setWanAddrMode("dhcp")} />
                <span>DHCP</span>
              </label>
              <label className="radio">
                <input type="radio" name="addr" checked={wanAddrMode === "static"} onChange={() => setWanAddrMode("static")} />
                <span>Static</span>
              </label>
            </div>
          </FormRow>

          <FormRow label="PIN Enable">
            <ToggleSwitch id="pin-enable" checked={pinEnable} onChange={setPinEnable} />
          </FormRow>
          {pinEnable && (
            <FormRow label="PIN" htmlFor="pin">
              <input
                id="pin"
                className="input"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </FormRow>
          )}
        </div>

        <Divider />

        <h3 className="group-title">MTU</h3>
        <div className="group">
          <FormRow label="MTU" htmlFor="mtu">
            <input
              id="mtu"
              className="input"
              placeholder="1500"
              value={mtu}
              onChange={(e) => setMtu(e.target.value)}
            />
          </FormRow>
        </div>

        <Divider />

        <h3 className="group-title">Others</h3>
        <div className="group">
          <FormRow label="NAT">
            <ToggleSwitch id="nat" checked={natOn} onChange={setNatOn} />
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

