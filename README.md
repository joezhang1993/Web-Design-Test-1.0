# Landing Page Preview Tooling

This repo now includes local tooling to replace the missing `browser_container` capability when you need visual preview artifacts.

## Install

```bash
npm install
npx playwright install chromium
```

## Run local preview

```bash
npm run preview
```

Open: `http://127.0.0.1:4173/index.html`

## Generate screenshot artifact

```bash
npm run capture
```

Output file:

- `artifacts/landing-preview.png`
