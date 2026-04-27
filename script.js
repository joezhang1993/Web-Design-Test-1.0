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

pieces.forEach((piece, index) => {
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
