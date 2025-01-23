const honeycomb = document.getElementById("honeycomb");
const side = 41; // Side length of the hexagon
const hexWidth = 2 * side;
const hexHeight = Math.sqrt(3) * side;

let allHexes = [];

/**
 * Generate a large honeycomb pattern that covers 300vw x 300vh.
 * This ensures no gaps around edges and maintains continuity.
 */
function generateHoneycomb() {
  // Clear existing hexes
  honeycomb.innerHTML = "";
  allHexes = [];

  // Make the honeycomb larger than the viewport
  const containerWidth = window.innerWidth * 2; // 300% width
  const containerHeight = window.innerHeight * 2; // 300% height

  const cols = Math.ceil(containerWidth / (hexWidth * 0.75));
  const rows = Math.ceil(containerHeight / hexHeight);

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const hex = document.createElement("div");
      hex.classList.add("hex");

      /*
       x = col * (0.75 * hexWidth)
       y = row * hexHeight + offset if col is odd
      */
      const xOffset = col * (hexWidth * 0.75);
      const yOffset = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);

      // Use transform for positioning
      hex.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

      // Add to DOM and track
      honeycomb.appendChild(hex);
      allHexes.push(hex);
    }
  }
}

/**
 * Light up multiple hexes randomly with a “breathe” effect.
 */
function lightUpMultipleHexes(n = 20) {
  if (allHexes.length === 0) return;

  const usedIndices = new Set();
  const max = Math.min(n, allHexes.length);

  while (usedIndices.size < max) {
    const idx = Math.floor(Math.random() * allHexes.length);
    usedIndices.add(idx);
  }

  // For each chosen hex, schedule its "lit" class to be added
  // after a random delay (in ms). Then remove it 4s later.
  usedIndices.forEach((idx) => {
    const delay = Math.random() * 2000; // Delay up to 2 seconds

    setTimeout(() => {
      allHexes[idx].classList.add("lit");

      // Remove .lit after the 4s animation finishes
      setTimeout(() => {
        allHexes[idx].classList.remove("lit");
      }, 4000);
    }, delay);
  });
}

// Generate the honeycomb on load and light up hexes at intervals
generateHoneycomb();

setInterval(() => {
  lightUpMultipleHexes(140);
}, 2000);

//window.addEventListener("resize", generateHoneycomb);
