const honeycomb = document.getElementById("honeycomb");
const side = 41;
const hexWidth = 2 * side;
const hexHeight = Math.sqrt(3) * side;

let allHexes = [];

function generateHoneycomb() {
  honeycomb.innerHTML = "";
  allHexes = [];

  const containerWidth = window.innerWidth * 2;
  const containerHeight = window.innerHeight * 2;

  const cols = Math.ceil(containerWidth / hexWidth);
  const rows = Math.ceil(containerHeight / hexHeight);

  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const hex = document.createElement("div");
      hex.classList.add("hex");

      const xOffset = col * (hexWidth * 0.75);
      const yOffset = (row + (col % 2) * 0.5) * hexHeight;

      hex.style.transform = `translate(${xOffset}px, ${yOffset}px)`;

      honeycomb.append(hex);
      allHexes.push(hex);
    }
  }
}

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

window.addEventListener("resize", generateHoneycomb);
