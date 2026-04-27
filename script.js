const pieces = [...document.querySelectorAll('.piece')];
const steps = [...document.querySelectorAll('.story-step')];

const startTransforms = [
  { x: '-120px', y: '-90px', r: '-14deg' },
  { x: '110px', y: '-80px', r: '12deg' },
  { x: '-110px', y: '70px', r: '-10deg' },
  { x: '120px', y: '60px', r: '14deg' },
  { x: '-20px', y: '140px', r: '-7deg' },
  { x: '20px', y: '-145px', r: '8deg' }
];

const layerTypes = ['plate', 'bridge', 'train', 'escapement', 'balance', 'dial'];
const RENDER_SIZE = 900;

function drawRing(ctx, cx, cy, outer, inner, color, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, outer, 0, Math.PI * 2);
  ctx.arc(cx, cy, inner, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
}

function drawGear(ctx, x, y, r, color) {
  drawRing(ctx, x, y, r, r - 14, color, 0.95);
  for (let k = 0; k < 24; k += 1) {
    const a = (Math.PI * 2 * k) / 24;
    const x1 = x + Math.cos(a) * (r - 14);
    const y1 = y + Math.sin(a) * (r - 14);
    const x2 = x + Math.cos(a) * (r + 8);
    const y2 = y + Math.sin(a) * (r + 8);
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  drawRing(ctx, x, y, 20, 14, '#d9dde3', 0.95);
}

function renderLayer(ctx, kind) {
  const size = RENDER_SIZE;
  const cx = size / 2;
  const cy = size / 2;
  ctx.clearRect(0, 0, size, size);

  const grain = ctx.createRadialGradient(cx, cy, 40, cx, cy, 360);
  grain.addColorStop(0, 'rgba(255,255,255,0.08)');
  grain.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = grain;
  ctx.fillRect(0, 0, size, size);

  if (kind === 'plate') {
    const g = ctx.createRadialGradient(cx, cy - 20, 80, cx, cy, 320);
    g.addColorStop(0, '#7f868f');
    g.addColorStop(1, '#343941');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, 320, 0, Math.PI * 2);
    ctx.fill();
    drawRing(ctx, cx, cy, 320, 302, '#a6adb8', 0.35);
    [[290, 300, 50], [630, 305, 34], [600, 590, 54], [340, 630, 40]].forEach(([x, y, r]) => {
      ctx.fillStyle = '#2b3036';
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
      drawRing(ctx, x, y, r, r - 7, '#9098a2', 0.75);
    });
  }

  if (kind === 'bridge') {
    ctx.fillStyle = '#423221';
    ctx.beginPath();
    ctx.arc(360, 390, 104, 0, Math.PI * 2);
    ctx.fill();
    drawRing(ctx, 360, 390, 108, 92, '#ccab74', 0.9);

    const bridge = ctx.createLinearGradient(220, 200, 700, 520);
    bridge.addColorStop(0, 'rgba(207,169,108,0.9)');
    bridge.addColorStop(1, 'rgba(122,96,62,0.9)');
    ctx.fillStyle = bridge;
    ctx.beginPath();
    ctx.moveTo(250, 190);
    ctx.bezierCurveTo(450, 145, 595, 220, 625, 355);
    ctx.bezierCurveTo(650, 465, 575, 560, 480, 610);
    ctx.bezierCurveTo(440, 630, 390, 640, 350, 630);
    ctx.bezierCurveTo(480, 585, 565, 500, 560, 390);
    ctx.bezierCurveTo(555, 295, 485, 220, 370, 225);
    ctx.bezierCurveTo(330, 227, 292, 235, 250, 190);
    ctx.fill();
  }

  if (kind === 'train') {
    drawGear(ctx, 460, 340, 88, '#d4dae3');
    drawGear(ctx, 300, 520, 64, '#c7cfd9');
    drawGear(ctx, 590, 560, 50, '#b7c2cf');
  }

  if (kind === 'escapement') {
    drawGear(ctx, 580, 330, 92, '#d9dfe6');
    ctx.fillStyle = 'rgba(203,164,99,0.9)';
    ctx.beginPath();
    ctx.moveTo(390, 420);
    ctx.lineTo(510, 355);
    ctx.lineTo(498, 390);
    ctx.lineTo(428, 470);
    ctx.closePath();
    ctx.fill();
  }

  if (kind === 'balance') {
    drawRing(ctx, 430, 500, 140, 126, '#d7a55d', 0.95);
    drawRing(ctx, 430, 500, 116, 112, '#efc581', 0.7);
    ctx.strokeStyle = '#d8ac64';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(430, 360);
    ctx.lineTo(430, 640);
    ctx.moveTo(290, 500);
    ctx.lineTo(570, 500);
    ctx.stroke();
  }

  if (kind === 'dial') {
    drawRing(ctx, cx, cy, 306, 292, '#eee2cf', 0.95);
    drawRing(ctx, cx, cy, 284, 282, '#eee2cf', 0.6);
    for (let k = 0; k < 12; k += 1) {
      const a = (Math.PI * 2 * k) / 12;
      ctx.strokeStyle = '#efe3d1';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * 270, cy + Math.sin(a) * 270);
      ctx.lineTo(cx + Math.cos(a) * 244, cy + Math.sin(a) * 244);
      ctx.stroke();
    }
    ctx.strokeStyle = '#5a87b8';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx, cy - 192);
    ctx.stroke();

    ctx.strokeStyle = '#d2a45d';
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + 150, cy + 74);
    ctx.stroke();
  }
}

pieces.forEach((piece, index) => {
  piece.width = RENDER_SIZE;
  piece.height = RENDER_SIZE;
  const ctx = piece.getContext('2d');
  renderLayer(ctx, layerTypes[index]);

  piece.style.setProperty('--x', startTransforms[index].x);
  piece.style.setProperty('--y', startTransforms[index].y);
  piece.style.setProperty('--r', startTransforms[index].r);
});

function setActiveStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('is-active', i === index);
    step.classList.toggle('is-past', i < index);
  });

  pieces.forEach((piece, i) => {
    piece.classList.toggle('active', i <= index);
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = Number(entry.target.dataset.step);
      setActiveStep(index);
    });
  },
  { root: null, threshold: 0.6 }
);

steps.forEach((step) => observer.observe(step));
setActiveStep(0);
