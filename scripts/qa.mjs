import { chromium } from 'playwright-core';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = process.env.PORTO_URL ?? 'http://127.0.0.1:4173';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const OUTPUT = path.resolve('qa-evidence');

const results = [];
const consoleErrors = [];
const failedRequests = [];

function record(name, status, detail = '') {
  results.push({ name, status, detail });
  console.log(`${status.padEnd(6)} ${name}${detail ? ` — ${detail}` : ''}`);
}

async function skipIntro(page) {
  const skip = page.getByRole('button', { name: /skip intro/i });
  if (await skip.isVisible().catch(() => false)) {
    await skip.click();
    await page.getByRole('dialog', { name: 'PORTO opening sequence' }).waitFor({ state: 'detached' });
  }
}

async function run() {
  await mkdir(OUTPUT, { recursive: true });
  const browser = await chromium.launch({ executablePath: CHROME, headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();

  page.on('console', (message) => {
    if (message.type() === 'error') {
      const location = message.location();
      consoleErrors.push(`console: ${message.text()} @ ${location.url || 'unknown'}:${location.lineNumber ?? 0}`);
    }
  });
  page.on('pageerror', (error) => consoleErrors.push(`pageerror: ${error.message}`));
  page.on('response', (response) => {
    if (response.status() >= 400) failedRequests.push(`${response.status()} ${response.url()}`);
  });
  page.on('requestfailed', (request) => {
    failedRequests.push(`FAILED ${request.url()} ${request.failure()?.errorText ?? ''}`);
  });

  try {
    const response = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    record('app serves', response?.ok() ? 'PASS' : 'FAIL', `HTTP ${response?.status()}`);

    await page.getByRole('dialog', { name: 'PORTO opening sequence' }).waitFor({ state: 'visible', timeout: 5000 });
    const introVisible = await page.getByRole('dialog', { name: 'PORTO opening sequence' }).isVisible().catch(() => false);
    record('intro renders', introVisible ? 'PASS' : 'FAIL');
    await skipIntro(page);

    const sectionIds = ['home', 'about', 'education', 'skills', 'projects', 'experience', 'certifications', 'github', 'linkedin', 'contact'];
    const present = await page.evaluate((ids) => ids.filter((id) => !document.getElementById(id)), sectionIds);
    record('all 10 sections present', present.length === 0 ? 'PASS' : 'FAIL', present.join(', '));

    const navLinks = await page.locator('nav[aria-label="Primary navigation"] a').count();
    record('desktop navigation', navLinks >= 8 ? 'PASS' : 'FAIL', `${navLinks} links`);

    const geometry = await page.evaluate(() => {
      const cta = document.querySelector('.hero__actions a[href="#projects"]');
      const ctaRect = cta?.getBoundingClientRect();
      const navItems = Array.from(document.querySelectorAll('.nav__links a'));
      const navTops = navItems.map((item) => Math.round(item.getBoundingClientRect().top));
      const sections = Array.from(document.querySelectorAll('main section'));
      return {
        heroCtaTop: Math.round(ctaRect?.top ?? -1),
        heroCtaBottom: Math.round(ctaRect?.bottom ?? -1),
        viewportHeight: window.innerHeight,
        navSingleLine: new Set(navTops).size === 1,
        tinySections: sections.filter((section) => section.getBoundingClientRect().height < 80).length,
      };
    });
    record(
      'hero CTA fits initial viewport',
      geometry.heroCtaTop > 0 && geometry.heroCtaBottom < geometry.viewportHeight ? 'PASS' : 'FAIL',
      `CTA ${geometry.heroCtaTop}-${geometry.heroCtaBottom}px in ${geometry.viewportHeight}px`,
    );
    record('desktop nav is one line', geometry.navSingleLine ? 'PASS' : 'FAIL');
    record('sections have real height', geometry.tinySections === 0 ? 'PASS' : 'FAIL', `${geometry.tinySections} tiny`);

    await page.keyboard.press('Tab');
    const firstFocused = await page.evaluate(() => document.activeElement?.className ?? '');
    record('keyboard skip link first', firstFocused.includes('skip-link') ? 'PASS' : 'FAIL', firstFocused);

    await page.getByRole('link', { name: 'Projects', exact: true }).first().click();
    await page.waitForTimeout(700);
    const projectsHash = new URL(page.url()).hash;
    record('navigation scrolls to Projects', projectsHash === '#projects' ? 'PASS' : 'FAIL', projectsHash);

    const cardCount = await page.locator('.project-card').count();
    record('exactly three project cards', cardCount === 3 ? 'PASS' : 'FAIL', `${cardCount} cards`);

    const externalLinks = await page.locator('a[href^="https://"]').count();
    record('external links present', externalLinks >= 10 ? 'PASS' : 'FAIL', `${externalLinks} links`);

    await page.screenshot({ path: path.join(OUTPUT, 'desktop-full.png'), fullPage: true });
    const imageStatus = await page.evaluate(() => {
      const images = Array.from(document.images);
      return {
        total: images.length,
        broken: images
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      };
    });
    record(
      'images load in browser',
      imageStatus.broken.length === 0 ? 'PASS' : 'FAIL',
      `${imageStatus.total} images, ${imageStatus.broken.length} broken${imageStatus.broken.length ? `: ${imageStatus.broken.join(', ')}` : ''}`,
    );

    // Contact form: invalid input must produce inline feedback without claiming delivery.
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.locator('form button[type="submit"]').first().click();
    await page.waitForTimeout(250);
    const alerts = await page.locator('[role="alert"]').count();
    record('empty form validation', alerts > 0 ? 'PASS' : 'FAIL', `${alerts} alert(s)`);

    const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    const mobilePage = await mobile.newPage();
    mobilePage.on('pageerror', (error) => consoleErrors.push(`mobile pageerror: ${error.message}`));
    mobilePage.on('response', (response) => {
      if (response.status() >= 400) failedRequests.push(`mobile ${response.status()} ${response.url()}`);
    });
    mobilePage.on('requestfailed', (request) => {
      failedRequests.push(`mobile FAILED ${request.url()} ${request.failure()?.errorText ?? ''}`);
    });
    await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 60000 });
    await skipIntro(mobilePage);
    const toggle = mobilePage.getByRole('button', { name: /open navigation menu/i });
    const toggleVisible = await toggle.isVisible().catch(() => false);
    record('mobile menu toggle', toggleVisible ? 'PASS' : 'FAIL');
    if (toggleVisible) {
      await toggle.click();
      const mobileLinks = await mobilePage.locator('#mobile-navigation a').count();
      record('mobile menu links', mobileLinks === 8 ? 'PASS' : 'FAIL', `${mobileLinks} links`);
      await mobilePage.locator('#mobile-navigation a[href="#skills"]').click();
      await mobilePage.waitForTimeout(600);
      record('mobile navigation', new URL(mobilePage.url()).hash === '#skills' ? 'PASS' : 'FAIL', new URL(mobilePage.url()).hash);
    }
    const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    record('mobile has no horizontal overflow', overflow ? 'FAIL' : 'PASS');
    await mobilePage.screenshot({ path: path.join(OUTPUT, 'mobile-full.png'), fullPage: true });

    const reduced = await browser.newContext({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    const reducedPage = await reduced.newPage();
    await reducedPage.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const reducedIntro = await reducedPage.getByRole('dialog', { name: 'PORTO opening sequence' }).isVisible().catch(() => false);
    record('reduced motion skips intro', reducedIntro ? 'FAIL' : 'PASS');

    record('no browser console errors', consoleErrors.length === 0 ? 'PASS' : 'FAIL', consoleErrors.join(' | '));
    record('no failed resource requests', failedRequests.length === 0 ? 'PASS' : 'FAIL', failedRequests.join(' | '));
    await browser.close();
  } catch (error) {
    record('qa harness completed', 'FAIL', error instanceof Error ? error.message : String(error));
    await browser.close();
  }

  await writeFile(path.join(OUTPUT, 'report.json'), JSON.stringify({ results, consoleErrors, failedRequests }, null, 2));
  if (results.some((item) => item.status === 'FAIL')) process.exitCode = 1;
}

run();
