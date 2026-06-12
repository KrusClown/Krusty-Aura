/* ═══════════════════════════════════════════
   KRUSTY AURA — Matrix Rain Animation
   File: matrix.js
   ═══════════════════════════════════════════ */

const canvas = document.getElementById('matrix');
const ctx    = canvas.getContext('2d');

const CHARS     = 'アイウエオカキクケコサシスセソタチツテトナニヌネノABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
const FONT_SIZE = 14;

let cols, drops;

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
  cols  = Math.floor(canvas.width / FONT_SIZE);
  drops = Array.from({ length: cols }, () => Math.random() * -50 | 0);
}

function draw() {
  // Get current theme colors (falls back to green if theme.js not loaded yet)
  const colors = window.getMatrixColors
    ? window.getMatrixColors()
    : { primary: '#00ff41', dark: '#009922', head: '#e0ffe0' };

  // Fade trail
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.font = `${FONT_SIZE}px "Courier New", monospace`;

  for (let i = 0; i < drops.length; i++) {
    const char = CHARS[Math.random() * CHARS.length | 0];
    const y    = drops[i] * FONT_SIZE;

    // Bright head character
    if (drops[i] > 0 && Math.random() > 0.95) {
      ctx.fillStyle = colors.head;
    } else {
      // Vary brightness for depth
      ctx.fillStyle = Math.random() > 0.7 ? colors.primary : colors.dark;
    }

    ctx.fillText(char, i * FONT_SIZE, y);

    // Reset column to top randomly
    if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

resize();
window.addEventListener('resize', resize);
setInterval(draw, 40);
