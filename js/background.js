const honeycomb = document.getElementById("honeycomb");
const side = 41;
const hexWidth = 2 * side;
const hexHeight = Math.sqrt(3) * side;

let allHexes = [];

// Generate a big honeycomb pattern that covers 200vw x 200vh.

function generateHoneycomb() {
  // Clear any existing hex
  honeycomb.innerHTML = "";
  allHexes = [];

  // .honeycomb is 200vw x 200vh, calculate how many columns/rows
  const containerWidth = window.innerWidth * 2;
  const containerHeight = window.innerHeight * 2;

  // Spacing for flat-topped hexes: ~0.75 * hexWidth horizontally
  const cols = Math.ceil(containerWidth / (hexWidth * 0.75)) + 2;
  const rows = Math.ceil(containerHeight / hexHeight) + 2;

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const hex = document.createElement("div");
      hex.classList.add("hex");

      const xOffset = col * (hexWidth * 0.75);
      const yOffset = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);

      // Position each hex using transform
      hex.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

      honeycomb.appendChild(hex);
      allHexes.push(hex);
    }
  }
}

//Light up N distinct hexes with a "breathe" effect, then turn them off.
function lightUpMultipleHexes(n = 20) {
  if (allHexes.length === 0) return;

  const usedIndices = new Set();
  const max = Math.min(n, allHexes.length);

  while (usedIndices.size < max) {
    const idx = Math.floor(Math.random() * allHexes.length);
    usedIndices.add(idx);
  }

  usedIndices.forEach((idx) => {
    const delay = Math.random() * 2000; // Random delay up to 2s

    setTimeout(() => {
      allHexes[idx].classList.add("lit");
      // Remove .lit after its 4s animation finishes
      setTimeout(() => {
        allHexes[idx].classList.remove("lit");
      }, 4000);
    }, delay);
  });
}

// window.addEventListener("resize", generateHoneycomb);

generateHoneycomb();

setInterval(() => {
  lightUpMultipleHexes(140);
}, 2000);
