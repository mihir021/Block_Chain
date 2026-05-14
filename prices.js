// ===== CONFIG =====
const PRICE_COINS = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", color: "#F7931A" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "#627EEA" },
  { id: "solana", name: "Solana", symbol: "SOL", color: "#9945FF" },
  { id: "polygon-ecosystem-token", name: "Polygon", symbol: "POL", color: "#8247E5" },
];

let selectedCoin = null;
let selectedDays = 7;
let featuredChart = null;
const sparklineCharts = {};

// ===== INIT =====
async function init() {
  animateRefreshIcon();
  await Promise.all([fetchPrices(), fetchGlobalData()]);
}

function animateRefreshIcon() {
  const icon = document.getElementById("refresh-icon");
  if (!icon) return;

  icon.classList.add("spinning");
  setTimeout(() => icon.classList.remove("spinning"), 1500);
}

// ===== FETCH PRICES + BUILD CARDS =====
async function fetchPrices() {
  const ids = PRICE_COINS.map((coin) => coin.id).join(",");
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko returned ${res.status}`);

    const data = await res.json();
    renderCards(sortCoins(data));
    document.getElementById("last-updated").textContent =
      `Last updated: ${new Date().toLocaleTimeString()}`;

    if (!selectedCoin && data.length) {
      await selectCoin(sortCoins(data)[0]);
    }
  } catch (err) {
    document.getElementById("coin-cards-grid").innerHTML =
      '<p class="error">Failed to fetch prices. CoinGecko may be rate-limiting. Wait 30s and refresh.</p>';
  }
}

function sortCoins(coinsData) {
  return PRICE_COINS
    .map((coin) => coinsData.find((item) => item.id === coin.id))
    .filter(Boolean);
}

function renderCards(coinsData) {
  const grid = document.getElementById("coin-cards-grid");
  grid.innerHTML = "";

  Object.values(sparklineCharts).forEach((chart) => chart.destroy());

  coinsData.forEach((coin) => {
    const isUp = coin.price_change_percentage_24h >= 0;
    const changeText = `${isUp ? "▲" : "▼"} ${Math.abs(coin.price_change_percentage_24h || 0).toFixed(2)}%`;

    const card = document.createElement("div");
    card.className = `coin-card ${selectedCoin === coin.id ? "selected" : ""}`;
    card.id = `card-${coin.id}`;
    card.onclick = () => selectCoin(coin);

    card.innerHTML = `
      <div class="card-top">
        <div class="coin-identity">
          <img class="coin-logo" src="${coin.image}" alt="${coin.name}" />
          <div class="coin-name-block">
            <span class="coin-name">${coin.name}</span>
            <span class="coin-symbol">${coin.symbol.toUpperCase()}</span>
          </div>
        </div>
        <span class="coin-change-badge ${isUp ? "up" : "down"}">${changeText}</span>
      </div>
      <div class="coin-price" data-target="${coin.current_price}">$0</div>
      <div class="sparkline-wrapper">
        <canvas id="spark-${coin.id}"></canvas>
      </div>
    `;

    grid.appendChild(card);

    const priceEl = card.querySelector(".coin-price");
    animateCurrency(priceEl, coin.current_price);

    requestAnimationFrame(() => {
      drawSparkline(coin.id, coin.sparkline_in_7d.price, isUp);
    });
  });
}

function animateCurrency(element, target) {
  const duration = 700;
  const startTime = performance.now();

  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    element.textContent = formatCurrency(value);

    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function formatCurrency(value) {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: value < 1 ? 4 : 2,
    maximumFractionDigits: value < 1 ? 4 : 2,
  });
}

// ===== SPARKLINE CHART =====
function drawSparkline(coinId, priceData, isUp) {
  const canvas = document.getElementById(`spark-${coinId}`);
  if (!canvas || !window.Chart) return;

  const ctx = canvas.getContext("2d");
  const color = isUp ? "#00e676" : "#ff1744";
  const gradient = ctx.createLinearGradient(0, 0, 0, 55);
  gradient.addColorStop(0, isUp ? "rgba(0,230,118,0.3)" : "rgba(255,23,68,0.3)");
  gradient.addColorStop(1, "rgba(0,0,0,0)");

  sparklineCharts[coinId] = new Chart(ctx, {
    type: "line",
    data: {
      labels: priceData.map((_, i) => i),
      datasets: [{
        data: priceData,
        borderColor: color,
        borderWidth: 1.5,
        fill: true,
        backgroundColor: gradient,
        pointRadius: 0,
        tension: 0.4,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      scales: {
        x: { display: false },
        y: { display: false },
      },
      animation: { duration: 600 },
    },
  });
}

// ===== SELECT COIN + FEATURED CHART =====
async function selectCoin(coin) {
  document.querySelectorAll(".coin-card").forEach((card) => card.classList.remove("selected"));
  const card = document.getElementById(`card-${coin.id}`);
  if (card) card.classList.add("selected");

  selectedCoin = coin.id;

  document.getElementById("chart-title").textContent = `${coin.name} - ${selectedDays} Day Price Trend`;
  document.getElementById("chart-subtitle").textContent = `${coin.symbol.toUpperCase()} / USD`;
  document.getElementById("chart-placeholder").style.display = "none";

  await loadFeaturedChart(coin.id, selectedDays);
  await loadCoinStats(coin.id);
}

async function setRange(days, btn) {
  selectedDays = days;
  document.querySelectorAll(".range-btn").forEach((button) => button.classList.remove("active"));
  btn.classList.add("active");

  if (selectedCoin) {
    const coinConfig = PRICE_COINS.find((coin) => coin.id === selectedCoin);
    const name = coinConfig ? coinConfig.name : selectedCoin;
    document.getElementById("chart-title").textContent = `${name} - ${selectedDays} Day Price Trend`;
    await loadFeaturedChart(selectedCoin, days);
  }
}

async function loadFeaturedChart(coinId, days) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko returned ${res.status}`);

    const data = await res.json();
    const prices = data.prices;
    const labels = prices.map((price) => {
      const date = new Date(price[0]);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
    const values = prices.map((price) => price[1]);
    const coinConfig = PRICE_COINS.find((coin) => coin.id === coinId);
    const color = coinConfig ? coinConfig.color : "#6c63ff";
    const canvas = document.getElementById("featured-chart");
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 300);

    gradient.addColorStop(0, hexToRgba(color, 0.33));
    gradient.addColorStop(1, hexToRgba(color, 0));

    if (featuredChart) featuredChart.destroy();

    featuredChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: coinId,
          data: values,
          borderColor: color,
          borderWidth: 2.5,
          fill: true,
          backgroundColor: gradient,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: color,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#151929",
            borderColor: "#1f2640",
            borderWidth: 1,
            titleColor: "#7986cb",
            bodyColor: "#e8eaf6",
            callbacks: {
              label: (ctx) => ` ${formatCurrency(ctx.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { color: "#1f2640" },
            ticks: {
              color: "#7986cb",
              maxTicksLimit: 7,
              font: { family: "Inter", size: 11 },
            },
            border: { color: "#1f2640" },
          },
          y: {
            position: "right",
            grid: { color: "#1f2640" },
            ticks: {
              color: "#7986cb",
              font: { family: "Inter", size: 11 },
              callback: (val) => "$" + Number(val).toLocaleString(),
            },
            border: { color: "#1f2640" },
          },
        },
        animation: { duration: 800, easing: "easeInOutQuart" },
      },
    });
  } catch (err) {
    console.error("Chart fetch failed", err);
  }
}

// ===== COIN STATS =====
async function loadCoinStats(coinId) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&community_data=false&developer_data=false`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`CoinGecko returned ${res.status}`);

    const data = await res.json();
    const market = data.market_data;

    document.getElementById("stat-mcap").textContent = compactMoney(market.market_cap.usd);
    document.getElementById("stat-vol").textContent = compactMoney(market.total_volume.usd);
    document.getElementById("stat-supply").textContent = market.circulating_supply
      ? compactNumber(market.circulating_supply)
      : "N/A";
    document.getElementById("stat-ath").textContent = formatCurrency(market.ath.usd);
    document.getElementById("stats-row").style.display = "grid";
  } catch (err) {
    console.error("Stats fetch failed", err);
  }
}

function compactMoney(value) {
  return "$" + compactNumber(value);
}

function compactNumber(value) {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function hexToRgba(hex, alpha) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}

// ===== GLOBAL MARKET DATA =====
async function fetchGlobalData() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/global");
    if (!res.ok) throw new Error(`CoinGecko returned ${res.status}`);

    const data = await res.json();
    const global = data.data;

    document.getElementById("bar-market").textContent = compactMoney(global.total_market_cap.usd);
    document.getElementById("bar-btc-dom").textContent =
      global.market_cap_percentage.btc.toFixed(1) + "%";
    document.getElementById("bar-coins").textContent =
      global.active_cryptocurrencies.toLocaleString();
    document.getElementById("bar-volume").textContent = compactMoney(global.total_volume.usd);
  } catch (err) {
    console.error("Global data fetch failed", err);
  }
}

// ===== START =====
window.addEventListener("load", init);
