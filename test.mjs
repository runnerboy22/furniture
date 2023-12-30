import puppeteer from 'puppeteer';

async function uHaul(url) {
  const browser = await puppeteer.launch({
    // headless: 'new',
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.type('#movingFromInput', '94598');

  await page.click(
    '#locationSearchForm > fieldset > div > div > div.cell.large-2.align-self-bottom > button'
  );

  await page.waitForSelector(
    '#storageResults > li:nth-child(1) > div:nth-child(1) > div.cell.auto > div:nth-child(2) > div.cell.medium-auto.large-3.text-right.show-for-medium > dl > dd > div > div:nth-child(2) > span'
  );

  const data = await page.$eval(
    '#storageResults > li:nth-child(1) > div:nth-child(1) > div.cell.auto > div:nth-child(2) > div.cell.medium-auto.large-3.text-right.show-for-medium > dl > dd > div > div:nth-child(2) > span',
    (el) => el.textContent
  );
  // const data = await page.$eval('#storageResults');
  const pretty = data.split('\n').join('').trim();
  const jsonData = JSON.stringify({ pretty });

  console.log(jsonData);

  // create array of locations and prices

  await page.click('#viewRates_815025');

  // next i want to collect prices and unit sizes to determine best price per sq ft
  // make selection

  // setTimeout(async () => {
  //   await browser.close();
  // }, 5000);
}

uHaul('https://www.uhaul.com/Storage/Online-Move-In/');
