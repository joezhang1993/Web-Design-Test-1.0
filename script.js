const steps = Array.from(document.querySelectorAll('.step'));
const parts = Array.from(document.querySelectorAll('.part'));
const assembly = document.getElementById('assembly');

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));

const fromTransforms = parts.map((part) => {
  const styles = getComputedStyle(part);
  return {
    x: parseFloat(styles.getPropertyValue('--from-x')) || 0,
    y: parseFloat(styles.getPropertyValue('--from-y')) || 0,
    scale: parseFloat(styles.getPropertyValue('--from-scale')) || 1,
  };
});

function updateAssembly() {
  const rect = assembly.getBoundingClientRect();
  const viewport = window.innerHeight;
  const total = rect.height - viewport;
  const current = clamp((-rect.top) / Math.max(total, 1));

  parts.forEach((part, i) => {
    const seg = parts.length - 0.0001;
    const local = clamp(current * seg - i + 0.15);
    const t = local * local * (3 - 2 * local);
    const from = fromTransforms[i];

    const x = lerp(from.x, 0, t);
    const y = lerp(from.y, 0, t);
    const s = lerp(from.scale, 1, t);
    const rot = lerp((i % 2 === 0 ? -11 : 11), 0, t);

    part.style.opacity = `${Math.max(0, local)}`;
    part.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s}) rotate(${rot}deg)`;
  });
}

function activateText() {
  const trigger = window.innerHeight * 0.45;
  steps.forEach((step) => {
    const rect = step.getBoundingClientRect();
    const active = rect.top < trigger && rect.bottom > trigger;
    step.classList.toggle('active', active);
  });
}

window.addEventListener('scroll', () => {
  updateAssembly();
  activateText();
}, { passive: true });

window.addEventListener('resize', updateAssembly);

updateAssembly();
activateText();
