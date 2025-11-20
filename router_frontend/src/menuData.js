/**
 * Router UI menu structure with deep nesting.
 * Each item:
 * - { label, path, desc?, children?, heading? }
 */

export const menuStructure = [
  {
    label: "Home",
    path: "/",
    desc: "Dashboard of the router.",
  },
  {
    heading: "Status",
    label: "Status",
    path: "/status",
    children: [
      { label: "WAN", path: "/wan", desc: "Wide Area Network status." },
      { label: "WAN Failover", path: "/wan-failover", desc: "WAN failover status." },
      { label: "LAN", path: "/lan", desc: "Local Area Network status." },
      { label: "WLAN", path: "/wlan", desc: "Wireless LAN status." },
      { label: "Statistics", path: "/statistics", desc: "View router statistics." },
      { label: "Throughput", path: "/throughput", desc: "Network throughput info." },
      { label: "WiFi Neighbor", path: "/wifi-neighbor", desc: "WiFi neighbor info." },
      { label: "Mesh information", path: "/mesh-information", desc: "Mesh info." },
      { label: "LCM", path: "/lcm", desc: "LCM subsystem." },
      { label: "Dual Image", path: "/dual-image", desc: "Dual image settings." },
      { label: "Cellular", path: "/cellular", desc: "Cellular module status." },
      { label: "Log", path: "/log", desc: "System Log (view events/logs)." }
    ]
  },
  {
    heading: "Basic Setup",
    label: "Basic Setup",
    path: "/basic-setup",
    children: [
      { label: "Internet Settings", path: "/internet-settings", desc: "Initial Internet config." },
      {
        label: "LAN",
        path: "/lan",
        children: [
          { label: "IPv4 Configuration", path: "/ipv4", desc: "LAN IPv4 configuration." },
          { label: "IPv6 Configuration", path: "/ipv6", desc: "LAN IPv6 configuration." },
          { label: "DHCP Server", path: "/dhcp-server", desc: "DHCP server configuration." }
        ]
      },
      {
        label: "WLAN",
        path: "/wlan",
        children: [
          { label: "Radio Settings", path: "/radio", desc: "Configure radio." },
          { label: "SSID", path: "/ssid", desc: "Manage SSIDs." },
          { label: "Security", path: "/security", desc: "WLAN security options." },
          { label: "Advanced", path: "/advanced", desc: "Advanced WLAN options." },
        ]
      },
      { label: "WAN", path: "/wan", desc: "WAN connection settings." }
    ]
  },
  {
    label: "Advance Setup",
    path: "/advance-setup",
    desc: "Additional configuration options."
  },
  {
    label: "Application",
    path: "/application",
    desc: "Router application management."
  },
  {
    label: "Management",
    path: "/management",
    children: [
      { label: "Admin", path: "/admin", desc: "Admin account settings." },
      { label: "Remote Management", path: "/remote", desc: "Remote management options." }
    ]
  },
  {
    label: "Tools",
    path: "/tools",
    children: [
      { label: "Diagnostics", path: "/diagnostics", desc: "Diagnostics tools." },
      { label: "Ping", path: "/ping", desc: "Ping utility." },
      { label: "Traceroute", path: "/traceroute", desc: "Traceroute tool." },
      { label: "Speed Test", path: "/speed-test", desc: "Measure internet speed." }
    ]
  }
];

// PUBLIC_INTERFACE
export function findMenuItemByPath(menu, searchPath, base = "") {
  // Returns {item, breadcrumb: [{label, path}]}
  for (const item of menu) {
    const fullPath = (base + (item.path || "")).replace(/\/+/g, "/");
    if (searchPath === fullPath) {
      return { item, breadcrumb: [{ label: item.label, path: fullPath }] };
    }
    if (item.children) {
      const res = findMenuItemByPath(item.children, searchPath, fullPath);
      if (res) {
        return {
          item: res.item,
          breadcrumb: [{ label: item.label, path: fullPath }].concat(res.breadcrumb),
        };
      }
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function getBreadcrumbPath(menu, searchPath) {
  const res = findMenuItemByPath(menu, searchPath);
  return res?.breadcrumb || [];
}
