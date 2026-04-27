import { spawn } from 'node:child_process';
import process from 'node:process';
import fs from 'node:fs/promises';
import { chromium } from 'playwright';

const PORT = 4173;
const URL = `http://127.0.0.1:${PORT}/index.html`;
const OUT = 'artifacts/landing-preview.png';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function waitForServer(retries = 25) {
  for (let i = 0; i < retries; i += 1) {
    try {
      const res = await fetch(URL, { method: 'HEAD' });
      if (res.ok) return;
    } catch {
      // retry
    }
    await sleep(200);
  }
  throw new Error('Preview server did not become ready in time.');
}

async function main() {
  await fs.mkdir('artifacts', { recursive: true });

  const server = spawn('python3', ['-m', 'http.server', `${PORT}`, '--bind', '127.0.0.1'], {
    stdio: 'ignore',
  });

  try {
    await waitForServer();

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1728, height: 1117 } });
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: OUT, fullPage: true });
    await browser.close();

    console.log(`Saved screenshot to ${OUT}`);
  } finally {
    server.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
