import puppeteer from 'puppeteer';

interface StorageFacilities {
  uHaul: string;
}

const storageFacilities: StorageFacilities = {
  uHaul: 'https://www.uhaul.com/Storage/Online-Move-In/',
};

async function uHaul(url: string): Promise<void> {
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

  // await page.waitForSelector(
  //   '#storageResults > li:nth-child(1) > div:nth-child(1) > div.cell.auto > div:nth-child(2) > div.cell.medium-auto.large-3.text-right.show-for-medium > dl > dd > div > div:nth-child(2) > span'
  // );

  // await page.waitForTimeout(5000);
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const locations = await page.$$eval(
    '#storageResults > li:nth-child(n) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a',
    (elements) => elements.map((el) => el.textContent?.trim())
  );
  const prices = await page.$$eval(
    // '#storageResults > li',
    '#storageResults > li:nth-child(n) > div:nth-child(1) > div.cell.auto > div:nth-child(2) > div.cell.medium-auto.large-3.text-right.show-for-medium > dl > dd > div > div:nth-child(2) > span',
    (elements) => elements.map((el) => el.textContent?.trim())
  );

  //   const locationPricePairs: { [location: string]: string } = {};
  // locations.forEach((location, index) => {
  //   locationPricePairs[location] = prices[index];
  // });

  const locationPricePairs: { [location: string]: string } = {};

  locations.forEach((location, index) => {
    const trimmedLocation = location?.trim(); // Safely trim the location
    const trimmedPrice = prices[index]?.trim(); // Safely trim the price

    // Only add to the object if both location and price are defined and not empty
    if (trimmedLocation && trimmedPrice) {
      locationPricePairs[trimmedLocation] = trimmedPrice;
    }
  });

  console.log(locationPricePairs);

  console.log(prices);
  console.log(locations);
  // const jsonPrices = JSON.stringify({ prices });
  // console.log(jsonPrices);
  // if (prices) {
  //   // const data = await page.$eval('#storageResults');
  //   const pretty = prices.map((e: any) => e.split('\n').join('').trim());
  //   const jsonData = JSON.stringify({ pretty });

  //   console.log(jsonData);
  // }
  // create on of locations and prices

  // await page.click('#viewRates_815025');

  // next i want to collect prices and unit sizes to determine best price per sq ft
  // make selection

  // setTimeout(async () => {
  //   await browser.close();
  // }, 5000);
}

uHaul(storageFacilities.uHaul);
