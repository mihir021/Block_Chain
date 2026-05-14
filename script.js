function toggleMenu() {
  const links = document.querySelector(".nav-links");
  const isOpen = links.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
}

document.addEventListener("click", (event) => {
  const links = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");

  if (!links || !toggle || !links.classList.contains("open")) return;
  if (links.contains(event.target) || toggle.contains(event.target)) return;

  links.classList.remove("open");
  document.body.classList.remove("menu-open");
});

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function mineBlock(blockNum) {
  const data = document.getElementById(`block${blockNum}-data`).value;
  const prevHash = document.getElementById(`block${blockNum}-prevhash`).value;
  const nonceInput = document.getElementById(`block${blockNum}-nonce`);
  const hashInput = document.getElementById(`block${blockNum}-hash`);
  const status = document.getElementById(`block${blockNum}-status`);
  const card = document.getElementById(`block${blockNum}-card`);
  let nonce = 0;
  let hash = "";

  status.textContent = "Mining...";
  status.className = "status";

  while (true) {
    hash = await sha256(data + prevHash + nonce);
    if (hash.startsWith("00")) break;
    nonce++;

    if (nonce % 100 === 0) {
      nonceInput.value = nonce;
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }

  nonceInput.value = nonce;
  hashInput.value = hash;
  status.textContent = "Block Valid";
  status.className = "status valid";
  card.classList.remove("invalid");
  card.classList.add("valid");

  if (blockNum === 1) {
    document.getElementById("block2-prevhash").value = hash;
    invalidateBlock(2);
  }
}

function invalidateBlock(blockNum) {
  const status = document.getElementById(`block${blockNum}-status`);
  const card = document.getElementById(`block${blockNum}-card`);

  if (!status || !card) return;

  status.textContent = "Block Invalid - Needs Re-mining";
  status.className = "status invalid";
  card.classList.remove("valid");
  card.classList.add("invalid");
}

window.addEventListener("load", () => {
  const block1Data = document.getElementById("block1-data");
  const block2Data = document.getElementById("block2-data");

  if (block1Data) {
    block1Data.addEventListener("input", () => {
      invalidateBlock(1);
      invalidateBlock(2);
    });
  }

  if (block2Data) {
    block2Data.addEventListener("input", () => {
      invalidateBlock(2);
    });
  }
});
