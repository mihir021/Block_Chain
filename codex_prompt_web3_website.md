# Codex Prompt — Arbitrum Builder Pods: 4-Page Web3 Website

## OVERVIEW

Build a complete, 4-page Web3 educational website using **HTML, CSS, and vanilla JavaScript** (no frameworks needed). All four pages must share the same navigation bar, color palette, fonts, and overall design language — they should feel like one unified product, not four separate files.

---

## DESIGN SYSTEM (apply to ALL pages)

```
Color Palette:
  --bg:         #0d0f1a      (dark navy background)
  --surface:    #151929      (card/section background)
  --border:     #1f2640      (subtle borders)
  --primary:    #6c63ff      (purple accent — buttons, highlights)
  --accent:     #00d4ff      (cyan accent — icons, hover states)
  --green:      #00e676      (price up / valid)
  --red:        #ff1744      (price down / invalid)
  --text:       #e8eaf6      (primary text)
  --muted:      #7986cb      (secondary/muted text)

Fonts (load from Google Fonts):
  Display font: "Space Grotesk" — for headings
  Body font:    "Inter" — for paragraphs and UI text

Shared Rules:
  - border-radius: 12px on all cards
  - box-shadow: 0 4px 24px rgba(108,99,255,0.10) on cards
  - All pages have the same <nav> at the top
  - Smooth scroll behavior
  - Fully responsive (mobile-friendly)
```

---

## SHARED NAVIGATION BAR

Put this exact `<nav>` at the top of every page:

```html
<nav class="navbar">
  <div class="nav-logo">⬡ Web3Hub</div>
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="concepts.html">Concepts</a></li>
    <li><a href="prices.html">Live Prices</a></li>
    <li><a href="simulator.html">Block Simulator</a></li>
  </ul>
  <button class="nav-toggle" onclick="toggleMenu()">☰</button>
</nav>
```

CSS for the nav:
```css
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
}
.nav-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--primary);
  letter-spacing: -0.5px;
}
.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0; padding: 0;
}
.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s;
}
.nav-links a:hover,
.nav-links a.active {
  color: var(--accent);
}
/* On each page, add class="active" to the matching <a> tag */
```

---

## FILE STRUCTURE

```
project/
├── index.html         ← Page 1: Home / Landing
├── concepts.html      ← Page 2: Concepts
├── prices.html        ← Page 3: Live Prices
├── simulator.html     ← Page 4: Block Simulator
├── style.css          ← Shared CSS (design system + nav)
└── README.md
```

Put the design system variables and nav styles in `style.css` and link it in every HTML file:
```html
<link rel="stylesheet" href="style.css">
```

---

## PAGE 1 — index.html (Home / Landing)

**Theme: Arbitrum & Layer 2 Overview**

### Sections to build:

#### 1. Hero Section
```
- Large headline: "The Future of Ethereum is Layer 2"
- Subtext: 2–3 sentences explaining what Layer 2 is in simple words
- Two CTA buttons: "Explore Concepts →" (links to concepts.html) and "See Live Prices →" (links to prices.html)
- Background: subtle animated gradient (purple to dark navy using CSS @keyframes)
```

#### 2. Features / Why Layer 2? Section
```
Three cards side by side, each with an emoji icon, title, and 2-sentence explanation:
  Card 1 🐢 → "Ethereum's Bottleneck" — high fees, slow transactions on mainnet
  Card 2 ⚡ → "What is Arbitrum?" — Layer 2 rollup that batches transactions off-chain
  Card 3 💸 → "Real-World Benefit" — 10x cheaper fees, same Ethereum security
```

#### 3. How It Works Section
```
A horizontal 3-step flow (use flexbox with arrows between steps):
  Step 1: "You send a transaction on Arbitrum"
  Step 2: "Arbitrum batches it with others off-chain"
  Step 3: "The batch is posted to Ethereum mainnet"
```

#### 4. Footer
```
- Your name (placeholder: "Built by [Your Name]")
- GitHub link (placeholder: "github.com/yourusername")
- Batch name (placeholder: "Arbitrum Builder Pods — Batch 1")
- Small copyright text
```

---

## PAGE 2 — concepts.html (Web3 Concepts)

Build 4 concept comparison cards. Each card has two columns (Side A vs Side B) with a VS badge in the middle.

### Card Structure (repeat for each concept):
```html
<div class="concept-card">
  <div class="side side-a">
    <h3>Web2</h3>
    <ul>
      <li>Centralized servers</li>
      <li>Companies own your data</li>
      <li>Requires login/accounts</li>
    </ul>
  </div>
  <div class="vs-badge">VS</div>
  <div class="side side-b">
    <h3>Web3</h3>
    <ul>
      <li>Decentralized blockchain</li>
      <li>You own your data</li>
      <li>Wallet-based identity</li>
    </ul>
  </div>
</div>
```

### 4 Concepts to Cover:

**1. Web2 vs Web3**
- Web2: Centralized, company-owned data, username/password login, can be censored
- Web3: Decentralized, user-owned data, wallet login, censorship-resistant

**2. Ethereum vs Bitcoin**
- Bitcoin: Digital currency, store of value, limited scripting, Proof of Work (now PoS for ETH)
- Ethereum: Programmable blockchain, smart contracts, DeFi/NFTs, Proof of Stake

**3. Public Key vs Private Key**
- Public Key: Your wallet address, shareable, like an email address, used to receive funds
- Private Key: Secret code, never share, signs transactions, if lost = funds gone forever

**4. Blockchain vs Traditional Database**
- Traditional DB: Centralized, editable by admin, fast, single point of failure
- Blockchain: Decentralized, immutable, slower, no single point of failure

### CSS for concept cards:
```css
.concept-card {
  display: flex;
  align-items: stretch;
  gap: 0;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}
.side {
  flex: 1;
  padding: 1.5rem 2rem;
}
.side-a { border-right: 1px solid var(--border); }
.side h3 { color: var(--accent); margin-bottom: 1rem; }
.side ul { color: var(--text); line-height: 2; }
.vs-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-weight: 900;
  font-size: 1.2rem;
  color: var(--primary);
  background: var(--border);
}
```

---

## PAGE 3 — prices.html (Live Crypto Prices)

### HTML Structure:
```html
<div class="prices-page">
  <h1>Live Crypto Prices</h1>
  <p class="subtitle">Real-time data from CoinGecko — updates on demand</p>
  <button id="refresh-btn" onclick="fetchPrices()">🔄 Refresh Prices</button>
  <div id="prices-grid" class="prices-grid">
    <!-- Cards injected by JS -->
  </div>
  <p id="last-updated" class="muted"></p>
</div>
```

### JavaScript — Full Working Code:
```javascript
const COINS = [
  { id: 'bitcoin',  name: 'Bitcoin',  symbol: 'BTC', icon: '₿' },
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', icon: 'Ξ' },
  { id: 'solana',   name: 'Solana',   symbol: 'SOL', icon: '◎' },
  { id: 'matic-network', name: 'Polygon', symbol: 'MATIC', icon: '⬡' },
];

async function fetchPrices() {
  const grid = document.getElementById('prices-grid');
  grid.innerHTML = '<p class="loading">Fetching prices...</p>';

  const ids = COINS.map(c => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    grid.innerHTML = '';

    COINS.forEach(coin => {
      const info = data[coin.id];
      if (!info) return;
      const price = info.usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      const change = info.usd_24h_change.toFixed(2);
      const isUp = change >= 0;

      const card = document.createElement('div');
      card.className = 'price-card';
      card.innerHTML = `
        <div class="coin-icon">${coin.icon}</div>
        <div class="coin-name">${coin.name} <span class="coin-symbol">${coin.symbol}</span></div>
        <div class="coin-price">${price}</div>
        <div class="coin-change ${isUp ? 'up' : 'down'}">
          ${isUp ? '▲' : '▼'} ${Math.abs(change)}%
        </div>
      `;
      grid.appendChild(card);
    });

    document.getElementById('last-updated').textContent =
      `Last updated: ${new Date().toLocaleTimeString()}`;
  } catch (err) {
    grid.innerHTML = `<p class="error">Failed to fetch prices. Try again later.</p>`;
  }
}

// Auto-fetch on page load
window.addEventListener('load', fetchPrices);
```

### CSS for price cards:
```css
.prices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}
.price-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.2s;
}
.price-card:hover { transform: translateY(-4px); }
.coin-icon { font-size: 2rem; margin-bottom: 0.5rem; }
.coin-name { font-weight: 700; color: var(--text); }
.coin-symbol { color: var(--muted); font-weight: 400; font-size: 0.85rem; }
.coin-price { font-size: 1.4rem; font-weight: 700; color: var(--accent); margin: 0.5rem 0; }
.coin-change { font-size: 1rem; font-weight: 600; }
.coin-change.up { color: var(--green); }
.coin-change.down { color: var(--red); }
```

---

## PAGE 4 — simulator.html (Block Mining Simulator)

### Concept:
Two blocks shown side by side. Block 1 has editable data. When you click "Mine", a nonce is incremented until the SHA-256 hash starts with "00". Block 2 uses Block 1's hash as its Previous Hash. If Block 1 data changes, Block 2 turns red (invalid).

### Full JavaScript — Complete Working Code:
```javascript
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

let block1Hash = '';

async function mineBlock(blockNum) {
  const data = document.getElementById(`block${blockNum}-data`).value;
  const prevHash = document.getElementById(`block${blockNum}-prevhash`).value;
  let nonce = 0;
  let hash = '';

  document.getElementById(`block${blockNum}-status`).textContent = 'Mining...';

  while (true) {
    hash = await sha256(data + prevHash + nonce);
    if (hash.startsWith('00')) break;
    nonce++;
    if (nonce % 100 === 0) {
      document.getElementById(`block${blockNum}-nonce`).value = nonce;
      await new Promise(r => setTimeout(r, 0)); // allow UI to update
    }
  }

  document.getElementById(`block${blockNum}-nonce`).value = nonce;
  document.getElementById(`block${blockNum}-hash`).value = hash;
  document.getElementById(`block${blockNum}-status`).textContent = '✅ Block Valid';
  document.getElementById(`block${blockNum}-status`).className = 'status valid';
  document.getElementById(`block${blockNum}-card`).classList.remove('invalid');
  document.getElementById(`block${blockNum}-card`).classList.add('valid');

  if (blockNum === 1) {
    block1Hash = hash;
    // Feed Block 1's hash into Block 2's previous hash field
    document.getElementById('block2-prevhash').value = hash;
    // Invalidate Block 2 since chain changed
    invalidateBlock(2);
  }
}

function invalidateBlock(blockNum) {
  document.getElementById(`block${blockNum}-status`).textContent = '❌ Block Invalid — Needs Re-mining';
  document.getElementById(`block${blockNum}-status`).className = 'status invalid';
  document.getElementById(`block${blockNum}-card`).classList.remove('valid');
  document.getElementById(`block${blockNum}-card`).classList.add('invalid');
}

// When Block 1 data changes, invalidate Block 2
document.getElementById('block1-data').addEventListener('input', () => {
  invalidateBlock(1);
  invalidateBlock(2);
});
```

### HTML Structure for each block:
```html
<div class="blocks-container">

  <!-- BLOCK 1 -->
  <div class="block-card valid" id="block1-card">
    <h3>Block #1</h3>
    <label>Block Data</label>
    <input id="block1-data" type="text" value="Hello Blockchain" />

    <label>Previous Hash</label>
    <input id="block1-prevhash" type="text" value="0000000000000000" readonly />

    <label>Nonce</label>
    <input id="block1-nonce" type="number" value="0" readonly />

    <label>Hash Output</label>
    <input id="block1-hash" type="text" readonly placeholder="Mine to generate..." />

    <div class="status" id="block1-status">⛏ Not mined yet</div>
    <button onclick="mineBlock(1)">⛏ Mine Block 1</button>
  </div>

  <!-- CHAIN LINK -->
  <div class="chain-arrow">⛓</div>

  <!-- BLOCK 2 -->
  <div class="block-card" id="block2-card">
    <h3>Block #2</h3>
    <label>Block Data</label>
    <input id="block2-data" type="text" value="Second Transaction" />

    <label>Previous Hash (from Block 1)</label>
    <input id="block2-prevhash" type="text" readonly placeholder="Mine Block 1 first..." />

    <label>Nonce</label>
    <input id="block2-nonce" type="number" value="0" readonly />

    <label>Hash Output</label>
    <input id="block2-hash" type="text" readonly placeholder="Mine to generate..." />

    <div class="status" id="block2-status">⛏ Not mined yet</div>
    <button onclick="mineBlock(2)">⛏ Mine Block 2</button>
  </div>

</div>

<!-- Explanation box -->
<div class="insight-box">
  💡 <strong>Try this:</strong> Mine Block 1, then Mine Block 2. Now change Block 1's data — 
  Block 2 immediately turns invalid. This is blockchain immutability in action.
</div>
```

### CSS for block simulator:
```css
.blocks-container {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;
}
.block-card {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 12px;
  padding: 1.5rem;
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: border-color 0.3s;
}
.block-card.valid  { border-color: var(--green); }
.block-card.invalid { border-color: var(--red); }

.block-card label { color: var(--muted); font-size: 0.8rem; text-transform: uppercase; }
.block-card input {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  font-family: 'Courier New', monospace;
  word-break: break-all;
  width: 100%;
}
.block-card button {
  margin-top: 0.5rem;
  padding: 0.75rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.block-card button:hover { background: var(--accent); color: var(--bg); }
.status { font-size: 0.9rem; font-weight: 600; padding: 0.4rem 0; }
.status.valid { color: var(--green); }
.status.invalid { color: var(--red); }
.chain-arrow { font-size: 2.5rem; color: var(--muted); }
.insight-box {
  background: var(--surface);
  border-left: 4px solid var(--primary);
  border-radius: 8px;
  padding: 1rem 1.5rem;
  margin-top: 2rem;
  color: var(--text);
  max-width: 720px;
  margin-inline: auto;
}
```

---

## README.md Template

```markdown
# Web3Hub — Arbitrum Builder Pods Assignment

A 4-page educational website covering core Web3 concepts, built with HTML, CSS, and vanilla JavaScript.

## Pages

| Page | File | Description |
|------|------|-------------|
| Home / Landing | index.html | Arbitrum & Layer 2 overview with hero and features |
| Concepts | concepts.html | Visual comparison cards: Web2 vs Web3, ETH vs BTC, etc. |
| Live Prices | prices.html | Real-time ETH/BTC prices from CoinGecko API |
| Block Simulator | simulator.html | Interactive SHA-256 mining simulator with 2-block chain |

## How to Run Locally

1. Clone the repo:
   ```
   git clone https://github.com/yourusername/web3hub.git
   cd web3hub
   ```
2. Open `index.html` in your browser — no build step or server needed.

## Known Issues / Future Improvements

- CoinGecko free API may rate-limit after many refreshes
- Block mining is simulated (not real Proof-of-Work difficulty)
- Could add more coins, charts, or wallet connect in future

## Built By

[Your Name] — Arbitrum Builder Pods, Batch 1
```

---

## FINAL INSTRUCTIONS FOR CODEX

1. Create all 5 files: `index.html`, `concepts.html`, `prices.html`, `simulator.html`, `style.css`
2. Link `style.css` in the `<head>` of every HTML file
3. Add the shared `<nav>` to every page, with `class="active"` on the correct page link
4. Load Google Fonts in every `<head>`: Space Grotesk + Inter
5. Use the CSS variables defined in `style.css` consistently
6. Make all pages fully responsive with `@media (max-width: 768px)` breakpoints
7. Test that the CoinGecko fetch works and block mining uses `crypto.subtle.digest`
```
