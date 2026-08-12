"use client";

import { useMemo, useState } from "react";

type Environment = "Production" | "Staging" | "Development";

const envStats: Record<Environment, { integrations: number; healthy: number; incidents: number; spend: string }> = {
  Production: { integrations: 94, healthy: 91, incidents: 3, spend: "$127.8K" },
  Staging: { integrations: 67, healthy: 66, incidents: 1, spend: "$31.2K" },
  Development: { integrations: 48, healthy: 48, incidents: 0, spend: "$14.6K" },
};

const issues = [
  { system: "Salesforce → Snowflake", severity: "Critical", detail: "OAuth token expires in 2h", cost: "$4.8K/mo", action: "Rotate token" },
  { system: "Stripe → NetSuite", severity: "Warning", detail: "P95 latency +38% this week", cost: "$2.1K/mo", action: "Inspect route" },
  { system: "Workday → Okta", severity: "Warning", detail: "7 stale service accounts", cost: "$940/mo", action: "Review access" },
];

const nodes = [
  { name: "Salesforce", abbr: "SF", className: "salesforce", x: 13, y: 20, status: "healthy" },
  { name: "Stripe", abbr: "ST", className: "stripe", x: 15, y: 72, status: "healthy" },
  { name: "Snowflake", abbr: "SN", className: "snowflake", x: 76, y: 18, status: "critical" },
  { name: "NetSuite", abbr: "NS", className: "netsuite", x: 80, y: 70, status: "warning" },
  { name: "Aegis Gateway", abbr: "AG", className: "aegis", x: 46, y: 44, status: "healthy" },
];

export default function Home() {
  const [environment, setEnvironment] = useState<Environment>("Production");
  const [window, setWindow] = useState("24h");
  const [selectedNode, setSelectedNode] = useState("Aegis Gateway");
  const stats = envStats[environment];
  const reliability = useMemo(() => ((stats.healthy / stats.integrations) * 100).toFixed(1), [stats]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">A</span><span>AEGIS ATLAS</span></div>
        <nav aria-label="Primary navigation">
          <a className="active" href="#overview"><span>◇</span>Overview</a>
          <a href="#map"><span>⌘</span>Integration map</a>
          <a href="#issues"><span>△</span>Breaks & risks <b>3</b></a>
          <a href="#cost"><span>◎</span>Cost intelligence</a>
          <a href="#trust"><span>⬡</span>Trust policies</a>
        </nav>
        <div className="trust-card">
          <div className="trust-icon">✓</div>
          <div><strong>Zero-trust enforced</strong><small>All connections verified</small></div>
        </div>
        <div className="profile"><span>JK</span><div><strong>Jordan Kim</strong><small>Platform owner</small></div><button aria-label="Open profile menu">•••</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div><span className="eyebrow">CONTROL PLANE</span><h1>Good morning, Jordan.</h1><p>Here’s what’s happening across your integration estate.</p></div>
          <div className="header-actions">
            <label><span>Environment</span><select value={environment} onChange={(e) => setEnvironment(e.target.value as Environment)}><option>Production</option><option>Staging</option><option>Development</option></select></label>
            <button className="icon-button" aria-label="Notifications">●<span /></button>
          </div>
        </header>

        <div className="security-strip"><span className="pulse" />Continuous verification active <i>•</i> 2.4M requests evaluated today <a href="#trust">View trust posture →</a></div>

        <section className="metrics" id="overview" aria-label="Environment summary">
          <article><div className="metric-head"><span>Connected products</span><em>+6 this month</em></div><strong>{stats.integrations}</strong><p>{stats.healthy} healthy <span>•</span> {stats.incidents} need attention</p></article>
          <article><div className="metric-head"><span>Reliability</span><em>↑ 0.4%</em></div><strong>{reliability}%</strong><p>Across {environment.toLowerCase()} routes</p></article>
          <article><div className="metric-head"><span>Monthly run cost</span><em className="neutral">Forecast</em></div><strong>{stats.spend}</strong><p>$18.4K savings identified</p></article>
          <article><div className="metric-head"><span>Trust coverage</span><em>Fully verified</em></div><strong>100%</strong><p>Least privilege on every route</p></article>
        </section>

        <section className="dashboard-grid">
          <article className="panel map-panel" id="map">
            <div className="panel-title"><div><span className="eyebrow">LIVE TOPOLOGY</span><h2>Your integration estate</h2></div><div className="segmented">{["1h", "24h", "7d"].map(v => <button key={v} onClick={() => setWindow(v)} className={window === v ? "selected" : ""}>{v}</button>)}</div></div>
            <div className="network" aria-label="Interactive integration topology">
              <div className="route route-a" /><div className="route route-b warning" /><div className="route route-c" /><div className="route route-d" />
              {nodes.map((node) => <button key={node.name} onClick={() => setSelectedNode(node.name)} className={`node ${node.className} ${node.status} ${selectedNode === node.name ? "selected-node" : ""}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} aria-label={`${node.name}, ${node.status}`}><span>{node.abbr}</span><small>{node.name}</small></button>)}
              <div className="flow-label verified">Verified · 1.8M</div><div className="flow-label degraded">Latency +38%</div>
            </div>
            <div className="map-footer"><span><i className="dot green" />Healthy</span><span><i className="dot amber" />Degraded</span><span><i className="dot red" />Critical</span><strong>{selectedNode} selected · {window} window</strong></div>
          </article>

          <article className="panel efficiency-panel" id="cost">
            <div className="panel-title"><div><span className="eyebrow">EFFICIENCY</span><h2>Optimization impact</h2></div><button aria-label="More options">•••</button></div>
            <div className="savings"><small>Potential annual savings</small><strong>$220.8K</strong><span>14.4% of integration spend</span></div>
            <div className="bar-chart" aria-label="Cost optimization by category">
              <div><label>Duplicate calls <b>$82K</b></label><span><i style={{ width: "78%" }} /></span></div>
              <div><label>Idle capacity <b>$64K</b></label><span><i style={{ width: "61%" }} /></span></div>
              <div><label>Route optimization <b>$46K</b></label><span><i style={{ width: "44%" }} /></span></div>
              <div><label>License overlap <b>$28K</b></label><span><i style={{ width: "27%" }} /></span></div>
            </div>
            <button className="primary">Review 12 opportunities <span>→</span></button>
          </article>
        </section>

        <section className="panel issues-panel" id="issues">
          <div className="panel-title"><div><span className="eyebrow">REQUIRES ATTENTION</span><h2>Breaks, risks & inefficiencies</h2></div><button className="text-button">View all 12 →</button></div>
          <div className="issue-table" role="table">
            <div className="issue-row table-head" role="row"><span>Connection</span><span>Finding</span><span>Exposure</span><span>Recommended action</span></div>
            {issues.slice(0, environment === "Development" ? 0 : environment === "Staging" ? 1 : 3).map((issue) => <div className="issue-row" role="row" key={issue.system}><span><i className={`severity ${issue.severity.toLowerCase()}`} /> <strong>{issue.system}</strong></span><span><b className={`badge ${issue.severity.toLowerCase()}`}>{issue.severity}</b>{issue.detail}</span><span>{issue.cost}</span><span><button>{issue.action} →</button></span></div>)}
            {environment === "Development" && <div className="empty-state">No active breaks in Development. Every route is healthy.</div>}
          </div>
        </section>
        <footer id="trust"><span>Last synchronized 48 seconds ago</span><span>Data remains encrypted in transit and at rest · No credentials stored</span></footer>
      </section>
    </main>
  );
}
