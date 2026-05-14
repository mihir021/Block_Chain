import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import htm from "htm";
import * as THREE from "three";

const html = htm.bind(React.createElement);

const Icon = ({ type }) => {
  const paths = {
    lightning: html`<path d="M18 3 7 18h8l-1 11 11-16h-8l1-10Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" />`,
    coin: html`<path d="M8 12c0-3 3.6-5 8-5s8 2 8 5-3.6 5-8 5-8-2-8-5Z" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M8 12v8c0 3 3.6 5 8 5s8-2 8-5v-8" fill="none" stroke="currentColor" stroke-width="2.2" />`,
    shield: html`<path d="M16 4 25 8v7c0 6-3.8 10.7-9 13-5.2-2.3-9-7-9-13V8l9-4Z" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="m11.5 16 3 3 6-7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />`,
    plug: html`<path d="M12 5v7M20 5v7M9 12h14v5a7 7 0 0 1-14 0v-5ZM16 24v4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />`,
    globe: html`<path d="M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM4 16h24M16 4c3 3.2 4.5 7.2 4.5 12S19 24.8 16 28M16 4c-3 3.2-4.5 7.2-4.5 12S13 24.8 16 28" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />`,
    tool: html`<path d="m20 6 6 6-4 4-6-6 4-4ZM15 11 6 20v6h6l9-9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" /><path d="m6 26 6-6" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />`,
    send: html`<path d="M5 17 27 6l-8 21-4-9-10-1Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" /><path d="m15 18 12-12" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />`,
    stack: html`<path d="M6 10 16 5l10 5-10 5-10-5Z" fill="none" stroke="currentColor" stroke-width="2.2" /><path d="M6 16 16 21l10-5M6 22l10 5 10-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />`,
    chain: html`<path d="M10 13h12a6 6 0 0 1 0 12h-4M22 19H10a6 6 0 0 1 0-12h4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />`,
    arrow: html`<path d="M4 10h10.2M10.8 5 16 10l-5.2 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`,
  };

  return html`<svg viewBox="0 0 32 32" aria-hidden="true">${paths[type]}</svg>`;
};

function ThreeHero() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    let renderer;
    let frameId;
    let resize = () => {};

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      mount.classList.add("no-webgl");
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    const group = new THREE.Group();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    camera.position.set(0, 0, 7.5);
    scene.add(group);
    scene.add(new THREE.AmbientLight(0x8aa0ff, 1.3));

    const keyLight = new THREE.PointLight(0x00d4ff, 90, 14);
    keyLight.position.set(3, 2.5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0x6c63ff, 55, 12);
    rimLight.position.set(-3, -2, 4);
    scene.add(rimLight);

    const coreGeometry = new THREE.IcosahedronGeometry(1.35, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x141b32,
      metalness: 0.25,
      roughness: 0.24,
      emissive: 0x10224a,
      emissiveIntensity: 0.55,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const wire = new THREE.LineSegments(
      new THREE.WireframeGeometry(coreGeometry),
      new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.65 })
    );
    core.add(wire);

    const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.52 });
    [2.15, 2.65, 3.08].forEach((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.01, 16, 160), orbitMaterial.clone());
      ring.rotation.x = Math.PI / 2.7;
      ring.rotation.y = index * 0.55;
      ring.rotation.z = index * 0.42;
      group.add(ring);
    });

    const nodes = [];
    const nodeGeometry = new THREE.SphereGeometry(0.095, 24, 24);
    const nodeMaterial = new THREE.MeshStandardMaterial({ color: 0x00d4ff, emissive: 0x00d4ff, emissiveIntensity: 1.5 });

    for (let i = 0; i < 9; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      const angle = (i / 9) * Math.PI * 2;
      node.position.set(Math.cos(angle) * 2.65, Math.sin(angle * 1.2) * 0.88, Math.sin(angle) * 1.65);
      nodes.push(node);
      group.add(node);
    }

    resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", resize);

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      group.rotation.y += 0.0045;
      group.rotation.x = Math.sin(Date.now() * 0.00055) * 0.08;
      core.rotation.x += 0.003;
      core.rotation.y += 0.006;
      nodes.forEach((node, index) => {
        node.scale.setScalar(1 + Math.sin(Date.now() * 0.002 + index) * 0.22);
      });
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return html`
    <div className="hero-visual" aria-hidden="true">
      <div className="three-shell">
        <div className="three-canvas" ref=${mountRef}></div>
        <div className="three-fallback">
          <div className="fallback-core"></div>
          <span></span><span></span><span></span><span></span>
        </div>
        <div className="scene-chip chip-top">Rollup Core</div>
        <div className="scene-chip chip-bottom">Ethereum Settlement</div>
      </div>
    </div>
  `;
}

const features = [
  ["lightning", "", "Faster execution", "Apps can serve active users without every interaction waiting on congested mainnet blockspace."],
  ["coin", "cyan", "Lower fees", "Rollup batching makes frequent actions viable for games, finance, social apps, and tools."],
  ["shield", "green", "Ethereum security", "Rollup data and dispute mechanics keep the system anchored to Ethereum's settlement layer."],
  ["plug", "amber", "EVM compatible", "Solidity contracts and familiar tooling can move to Arbitrum with minimal friction."],
  ["globe", "pink", "Deep ecosystem", "Major protocols, wallets, bridges, analytics, and infrastructure already support Arbitrum."],
  ["tool", "", "Developer ready", "Use Hardhat, Foundry, Remix, subgraphs, and standard Ethereum workflows from day one."],
];

function Hero() {
  return html`
    <section className="home-hero" id="hero">
      <div id="tsparticles"></div>
      <div className="hero-grid" data-aos="fade-up" data-aos-duration="900">
        <div className="hero-copy">
          <div className="hero-badge"><span className="badge-dot"></span><span>Arbitrum Builder Pods / Batch 1</span></div>
          <h1 className="hero-title">The Future of Ethereum is <span className="hero-highlight">Layer 2</span></h1>
          <p className="hero-sub">Layer 2 networks move activity off-chain, compress it, and settle proofs back to Ethereum. Arbitrum gives builders fast execution, low fees, and Ethereum-grade trust without forcing users to compromise.</p>
          <div className="hero-actions">
            <a href="concepts.html" className="btn-primary">Explore Concepts <${Icon} type="arrow" /></a>
            <a href="prices.html" className="btn-ghost">See Live Prices <${Icon} type="arrow" /></a>
          </div>
          <a className="scroll-hint" href="#problem"><span>Scroll to explore</span><${Icon} type="arrow" /></a>
        </div>
        <${ThreeHero} />
      </div>
    </section>
  `;
}

function Stats() {
  return html`
    <section className="stats-bar" aria-label="Arbitrum network statistics">
      ${[
        ["stat-txns", "M+", "Transactions on Arbitrum"],
        ["stat-fees", "x", "Cheaper than Ethereum L1"],
        ["stat-tvl", "B+", "TVL secured by Arbitrum"],
        ["stat-dapps", "+", "DApps deployed"],
      ].map(([id, unit, label], index) => html`
        <div className="stat-item" data-aos="fade-up" data-aos-delay=${index * 100}>
          <div><span className="stat-num" id=${id}>0</span><span className="stat-unit">${unit}</span></div>
          <span className="stat-desc">${label}</span>
        </div>
        ${index < 3 && html`<div className="stat-divider"></div>`}
      `)}
    </section>
  `;
}

function StorySection({ reverse, label, title, paragraphs, bullets, tone }) {
  const cardClass = tone === "problem" ? "problem-card" : "solution-card";
  const statClass = tone === "problem" ? "red" : "green";
  const value = tone === "problem" ? "$187" : "$0.04";
  const sub = tone === "problem" ? "Illustrative peak gas fee" : "Illustrative low transaction fee";
  const fills = tone === "problem"
    ? [["Speed", "speed-low"], ["Cost", "cost-high"], ["Capacity", "capacity-low"]]
    : [["Speed", "speed-high"], ["Cost", "cost-low"], ["Capacity", "capacity-high"]];

  return html`
    <section className="story-section ${reverse ? "story-reverse" : ""}" id=${tone}>
      <div className="story-inner ${reverse ? "reverse" : ""}">
        <div className="story-text" data-aos="fade-right">
          <div className="section-label">${label}</div>
          <h2>${title}</h2>
          ${paragraphs.map((text) => html`<p>${text}</p>`)}
          <ul className="story-bullets">
            ${bullets.map(([kicker, text]) => html`<li><span>${kicker}</span><strong>${text}</strong></li>`)}
          </ul>
        </div>
        <div className="story-visual" data-aos="fade-left">
          <div className=${`visual-card ${cardClass}`}>
            <div className="vc-label">${tone === "problem" ? "Ethereum Mainnet" : "Arbitrum Layer 2"}</div>
            <div className=${`vc-stat ${statClass}`}>${value}</div>
            <div className="vc-sub">${sub}</div>
            ${fills.map(([name, cls]) => html`
              <div className="vc-bar-row"><span>${name}</span><div className="vc-bar"><div className=${`vc-fill ${statClass === "red" ? "red-fill" : "green-fill"} ${cls}`}></div></div></div>
            `)}
          </div>
        </div>
      </div>
    </section>
  `;
}

function HowItWorks() {
  const steps = [
    ["send", "01", "You send a transaction", "Your wallet submits a transaction to Arbitrum's sequencer with a fast response and a low fee."],
    ["stack", "02", "Arbitrum batches it", "Many transactions are grouped together off-chain, reducing duplicated work and compressing data."],
    ["chain", "03", "Ethereum settles it", "The batch is posted to Ethereum, giving the transaction a durable and verifiable home."],
  ];

  return html`
    <section className="how-section">
      <div className="section-header" data-aos="fade-up">
        <div className="section-label">How It Works</div>
        <h2>From click to settlement</h2>
        <p className="section-sub">Every Arbitrum transaction moves through a clear path from wallet action to Ethereum finality.</p>
      </div>
      <div className="steps-flow" data-aos="fade-up" data-aos-delay="100">
        ${steps.map(([icon, num, title, text], index) => html`
          <article className="step-card">
            <div className="step-num">${num}</div>
            <div className="step-icon"><${Icon} type=${icon} /></div>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
          ${index < 2 && html`<div className="step-arrow" aria-hidden="true"><span></span></div>`}
        `)}
      </div>
    </section>
  `;
}

function Features() {
  return html`
    <section className="features-section" id="features">
      <div className="section-header" data-aos="fade-up">
        <div className="section-label">Why Arbitrum</div>
        <h2>Built for serious builders</h2>
      </div>
      <div className="features-grid">
        ${features.map(([icon, tone, title, text], index) => html`
          <article className="feature-card" data-aos="fade-up" data-aos-delay=${(index % 3) * 80}>
            <div className=${`fc-icon ${tone}`}><${Icon} type=${icon} /></div>
            <h3>${title}</h3>
            <p>${text}</p>
          </article>
        `)}
      </div>
    </section>
  `;
}

function Compare() {
  const rows = [
    ["Primary role", "Settlement and security", "Fast execution and batching"],
    ["User fees", "Higher during demand spikes", "Designed for lower everyday costs"],
    ["Developer experience", "Native EVM environment", "EVM compatible rollup environment"],
    ["Best used for", "High-value final settlement", "Consumer-scale app interactions"],
  ];

  return html`
    <section className="compare-section">
      <div className="section-header" data-aos="fade-up">
        <div className="section-label">Technical Comparison</div>
        <h2>Ethereum L1 and Arbitrum L2 work together</h2>
      </div>
      <div className="comparison-card" data-aos="fade-up" data-aos-delay="100">
        <div className="compare-row compare-head"><div>Capability</div><div>Ethereum L1</div><div>Arbitrum L2</div></div>
        ${rows.map((row) => html`<div className="compare-row">${row.map((cell) => html`<div>${cell}</div>`)}</div>`)}
      </div>
    </section>
  `;
}

function CTA() {
  return html`
    <section className="cta-section" data-aos="zoom-in">
      <div className="cta-inner">
        <div className="cta-grid" aria-hidden="true"></div>
        <h2>Ready to explore Web3?</h2>
        <p>Dive into concepts, track live prices, and simulate block mining in your browser.</p>
        <div className="cta-buttons">
          <a href="concepts.html" className="btn-primary">Start with Concepts</a>
          <a href="simulator.html" className="btn-ghost">Try Block Simulator</a>
        </div>
      </div>
    </section>
  `;
}

function Footer() {
  return html`
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-logo">
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3 27 9.5v13L16 29 5 22.5v-13L16 3Z" fill="none" stroke="currentColor" stroke-width="2.4" /></svg>
          <span>Web3Hub</span>
        </div>
        <p className="footer-tagline">Built for Arbitrum Builder Pods / Batch 1</p>
        <div className="footer-links">
          <a href="index.html">Home</a>
          <a href="concepts.html">Concepts</a>
          <a href="prices.html">Live Prices</a>
          <a href="simulator.html">Block Simulator</a>
        </div>
        <p className="footer-copy">© 2026 Rathod Mihir. Built on the open web.</p>
      </div>
    </footer>
  `;
}

function App() {
  useEffect(() => {
    if (window.AOS) AOS.init({ once: true, duration: 800, easing: "ease-out-cubic" });
    if (window.location.hash) {
      setTimeout(() => {
        document.querySelector(window.location.hash)?.scrollIntoView();
        if (window.AOS) AOS.refreshHard();
      }, 700);
    }
    if (window.tsParticles) {
      tsParticles.load("tsparticles", {
        fullScreen: { enable: false },
        particles: {
          number: { value: 58, density: { enable: true, area: 900 } },
          color: { value: ["#6c63ff", "#00d4ff", "#e8eaf6"] },
          opacity: { value: 0.22, random: true },
          size: { value: 2, random: true },
          move: { enable: true, speed: 0.45, random: true, outModes: "out" },
          links: { enable: true, color: "#6c63ff", opacity: 0.12, distance: 132, width: 1 },
        },
        interactivity: {
          events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
          modes: { grab: { distance: 150, links: { opacity: 0.28 } }, push: { quantity: 3 } },
        },
      });
    }

    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !window.countUp) return;
        new countUp.CountUp("stat-txns", 500, { duration: 2.5 }).start();
        new countUp.CountUp("stat-fees", 10, { duration: 2 }).start();
        new countUp.CountUp("stat-tvl", 3.2, { duration: 2.5, decimalPlaces: 1 }).start();
        new countUp.CountUp("stat-dapps", 600, { duration: 2.5 }).start();
        counterObs.disconnect();
      });
    }, { threshold: 0.4 });

    const statsBar = document.querySelector(".stats-bar");
    if (statsBar) counterObs.observe(statsBar);
  }, []);

  return html`
    <main className="home-main">
      <${Hero} />
      <${Stats} />
      <${StorySection}
        reverse=${true}
        label="The Problem"
        title="Ethereum grew faster than its blockspace."
        tone="problem"
        paragraphs=${[
          "As Ethereum became the home of DeFi, NFTs, and on-chain communities, every user started competing for the same limited mainnet capacity. During peak activity, a simple swap could cost more than the trade itself.",
          "Builders needed a way to keep Ethereum's settlement guarantees while giving real users a product that felt fast, affordable, and ready for daily use.",
        ]}
        bullets=${[
          ["Gas spikes", "$50 to $200 per transaction at peak congestion"],
          ["Throughput ceiling", "About 15 transactions per second on L1"],
          ["User friction", "Waiting and failed transactions became normal"],
        ]}
      />
      <${StorySection}
        label="The Solution"
        title="Arbitrum gives Ethereum an express execution layer."
        tone="solution"
        paragraphs=${[
          "Arbitrum is an Optimistic Rollup. It executes transactions off Ethereum, batches them efficiently, and posts the resulting data back to mainnet so the system can be verified.",
          "The result is a user experience that feels instant while still inheriting the security assumptions that make Ethereum valuable.",
        ]}
        bullets=${[
          ["Lower cost", "Fees designed for everyday app interactions"],
          ["Higher throughput", "Batch execution unlocks scale for active apps"],
          ["Ethereum aligned", "Settlement and verification return to L1"],
        ]}
      />
      <${HowItWorks} />
      <${Features} />
      <${Compare} />
      <${CTA} />
    </main>
    <${Footer} />
  `;
}

createRoot(document.getElementById("root")).render(html`<${App} />`);
