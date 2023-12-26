const puppeteer = require('puppeteer');

async function takeScreenshot(url) {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.screenshot({ path: 'screenshot.png' });

  await browser.close();
}

takeScreenshot('https://example.com');
