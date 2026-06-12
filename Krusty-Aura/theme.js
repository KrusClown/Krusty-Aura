/* ═══════════════════════════════════════════
   KRUSTY AURA — Theme Switcher
   File: theme.js
   ═══════════════════════════════════════════ */

const themes = ['green', 'red', 'purple', 'blue', 'rgb'];

// Map each theme to its matrix colors so the canvas updates too
const matrixColors = {
  green:  { primary: '#00ff41', dark: '#009922', head: '#e0ffe0' },
  red:    { primary: '#ff2020', dark: '#991000', head: '#ffe0e0' },
  purple: { primary: '#bf00ff', dark: '#7700aa', head: '#f0e0ff' },
  blue:   { primary: '#00b4ff', dark: '#005599', head: '#e0f4ff' },
  rgb:    null, // handled separately — rotates in matrix.js
};

let currentTheme = 'green';
let rgbHue = 0; // used by matrix.js for rgb mode

function setTheme(theme) {
  currentTheme = theme;

  // Apply theme to <html> data attribute
  document.documentElement.setAttribute('data-theme', theme);

  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.color === theme);
  });

  // Persist choice
  try { localStorage.setItem('krusty-theme', theme); } catch (_) {}
}

// Button click listeners
document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => setTheme(btn.dataset.color));
});

// Restore saved theme on load
try {
  const saved = localStorage.getItem('krusty-theme');
  if (saved && themes.includes(saved)) setTheme(saved);
} catch (_) {}

// Expose to matrix.js
window.getMatrixColors = function () {
  if (currentTheme === 'rgb') {
    // Cycle hue for rainbow matrix
    rgbHue = (rgbHue + 1) % 360;
    const h1 = `hsl(${rgbHue}, 100%, 50%)`;
    const h2 = `hsl(${(rgbHue + 30) % 360}, 100%, 25%)`;
    const head = `hsl(${(rgbHue + 180) % 360}, 100%, 90%)`;
    return { primary: h1, dark: h2, head };
  }
  return matrixColors[currentTheme] || matrixColors.green;
};
