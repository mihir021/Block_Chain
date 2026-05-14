# Web3Hub - Arbitrum Builder Pods

Web3Hub is a 4-page educational Web3 website built with HTML, CSS, and vanilla JavaScript. It explains Layer 2 scaling, compares core blockchain concepts, displays live crypto market data, and includes a simple block mining simulator.

Built by **Rathod Mihir** for **Arbitrum Builder Pods - Batch 1**.

## Live Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Landing page explaining Ethereum Layer 2 and Arbitrum |
| Concepts | `concepts.html` | Side-by-side Web3 comparison cards |
| Live Prices | `prices.html` | CoinGecko-powered live prices, sparklines, market stats, and charts |
| Block Simulator | `simulator.html` | Interactive SHA-256 mining demo with linked blocks |

## Features

- Responsive dark Web3 interface
- Shared navigation and visual design across all pages
- Live CoinGecko API integration
- Premium crypto price cards with real coin logos
- Sparkline mini-charts and featured Chart.js price chart
- 7D, 14D, and 30D chart range controls
- Global market summary bar
- Coin stats including market cap, volume, supply, and ATH
- Interactive block mining simulator using `crypto.subtle.digest`
- No framework or build step required

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- React
- Three.js
- Chart.js
- CoinGecko API
- Google Fonts: Space Grotesk and Inter

## Project Structure

```text
Block_Chain/
├── index.html
├── concepts.html
├── prices.html
├── simulator.html
├── style.css
├── home.css
├── concepts.css
├── home-bundle.js
├── src/
│   └── home-app.js
├── prices.css
├── script.js
├── prices.js
├── codex_prompt_web3_website.md
└── README.md
```

## Run Locally

Open `index.html` directly in a browser, or run a local static server:

```bash
cd "Block_Chain"
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

Using a local server is recommended because live API requests and `crypto.subtle` work more reliably in a browser-served context.

If you edit the React home page source in `src/home-app.js`, rebuild the browser bundle:

```bash
npm install
npm run build:home
```

## Deploy To Vercel

This is a static website. The committed `home-bundle.js` means Vercel can deploy without a build command.

1. Push this repository to GitHub.
2. Go to `https://vercel.com`.
3. Sign in with GitHub.
4. Click **Add New...** then **Project**.
5. Import the `mihir021/Block_Chain` repository.
6. Use these settings:
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: leave empty
   - Output Directory: leave empty
   - Install Command: leave empty
7. Click **Deploy**.
8. After deployment, open the generated Vercel URL.

If Vercel asks for an output directory, keep it as the repository root because `index.html` is already at the root.

## Notes

- CoinGecko's free API can rate-limit repeated refreshes.
- The block simulator uses a low mining difficulty so it runs quickly in the browser.
- The Polygon card uses CoinGecko's current `polygon-ecosystem-token` id for POL data.

## Author

**Rathod Mihir**

- GitHub: <https://github.com/mihir021>
- Email: `rathodmihir1113@gmail.com`
