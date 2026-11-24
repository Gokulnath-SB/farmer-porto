import { chromium } from 'playwright-core';

const BASE_URL = process.env.PORTO_URL ?? 'http://127.0.0.1:4173';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

const hrefs = await page.evaluate(() =>
  Array.from(document.querySelectorAll('a[href^="http"]'))
    .map((link) => link.href)
    .filter((href, index, all) => all.indexOf(href) === index),
);

const unique = [...new Set(hrefs)];
for (const href of unique) {
  let status;
  try {
    const response = await fetch(href, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; PORTO-QA/1.0)' },
    });
    status = `HTTP ${response.status}`;
  } catch (error) {
    status = `ERROR ${error instanceof Error ? error.message : String(error)}`;
  }
  console.log(`${status.padEnd(24)} ${href}`);
}

console.log(`Checked ${unique.length} unique external URLs.`);
await browser.close();
