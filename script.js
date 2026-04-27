const story = document.getElementById('story');
const panels = Array.from(document.querySelectorAll('.panel'));
const parts = Array.from(document.querySelectorAll('.part'));

const clamp = (n, min = 0, max = 1) => Math.max(min, Math.min(max, n));
const lerp = (a, b, t) => a + (b - a) * t;

const from = parts.map((part) => {
  const s = getComputedStyle(part);
  return {
    x: parseFloat(s.getPropertyValue('--x')) || 0,
    y: parseFloat(s.getPropertyValue('--y')) || 0,
    scale: parseFloat(s.getPropertyValue('--s')) || 1,
  };
});

function animateAssembly() {
  const rect = story.getBoundingClientRect();
  const viewport = window.innerHeight;
  const scrollable = Math.max(rect.height - viewport, 1);
  const progress = clamp((-rect.top) / scrollable);

  parts.forEach((part, index) => {
    const segmentProgress = clamp(progress * parts.length - index + 0.18);
    const t = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
    const start = from[index];

    const x = lerp(start.x, 0, t);
    const y = lerp(start.y, 0, t);
    const scale = lerp(start.scale, 1, t);
    const rot = lerp(index % 2 === 0 ? -10 : 10, 0, t);

    part.style.opacity = `${segmentProgress}`;
    part.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rot}deg)`;
  });
}

function activatePanels() {
  const trigger = window.innerHeight * 0.48;

  panels.forEach((panel) => {
    const rect = panel.getBoundingClientRect();
    const active = rect.top <= trigger && rect.bottom >= trigger;
    panel.classList.toggle('active', active);
  });
}

function onScroll() {
  animateAssembly();
  activatePanels();
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

onScroll();
