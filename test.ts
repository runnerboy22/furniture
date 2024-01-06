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

  // await page.waitForTimeout(5000);
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const locations = await page.$$eval(
    '#storageResults > li:nth-child(n) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a',
    (elements) => elements.map((el) => el.textContent?.trim())
  );
  const prices = await page.$$eval(
    '#storageResults > li:nth-child(n) > div:nth-child(1) > div.cell.auto > div:nth-child(2) > div.cell.medium-auto.large-3.text-right.show-for-medium > dl > dd > div > div:nth-child(2) > span',
    (elements) => elements.map((el) => el.textContent?.trim())
  );

  const locationPricePairs: { [location: string]: string } = {};

  locations.forEach((location, index) => {
    const trimmedLocation = location?.trim(); // Safely trim the location
    const trimmedPrice = prices[index]?.trim(); // Safely trim the price

    // click into each location to determine prices, square ft, and price per sq ft
    // spawn multiple tabs to do this... or just do it sequentially with the back button

    // Only add to the object if both location and price are defined and not empty
    if (trimmedLocation && trimmedPrice) {
      locationPricePairs[trimmedLocation] = trimmedPrice;
    }
  });
  let allLocations = {};
  // start appending to the object to build out the data
  for (let i = 0; i < locations.length; i++) {
    await page.click(
      `#storageResults > li:nth-child(${
        i + 1
      }) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a`
    );

    // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    const smallDimensions = await page.$$eval(
      `#small_IndoorStorage_RoomList > li:nth-child(${
        i + 1
      }) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4`,
      (elements) =>
        elements.map((el) => {
          const dimensions = el.textContent?.trim().split('|')[1].trim() ?? '';
          const numbers = dimensions
            .split(' x ')
            .map((dim: string) => parseInt(dim));
          return numbers; // returns an array of numbers for each element
        })
    );

    // smallDimensions is now an array of arrays, each containing three numbers
    console.log(smallDimensions);
    // calculate cubic feet
    const cubicFeet = smallDimensions.map((dim) => {
      return dim.reduce((acc: number, curr: number) => acc * curr);
    });
    console.log(cubicFeet);

    const smallPrices = await page.$$eval(
      `#small_IndoorStorage_RoomList > li:nth-child(${
        i + 1
      }) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b1`,
      (elements) => elements.map((el) => el.textContent?.trim())
    );

    console.log(smallPrices);

    const smallPricePerCubicFoot = smallPrices.map((price, index) => {
      const numericPrice = parseFloat(price!.replace('$', ''));
      const pricePerCubicFoot = numericPrice / cubicFeet[index];
      return pricePerCubicFoot.toFixed(2);
    });

    console.log(smallPricePerCubicFoot);

    await page.goBack({ waitUntil: 'networkidle2' });
  }

  await page.click(
    '#storageResults > li:nth-child(1) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a'
  );

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const smallDimensions = await page.$$eval(
    '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4',
    (elements) =>
      elements.map((el) => {
        const dimensions = el.textContent?.trim().split('|')[1].trim() ?? '';
        const numbers = dimensions
          .split(' x ')
          .map((dim: string) => parseInt(dim));
        return numbers; // returns an array of numbers for each element
      })
  );

  // smallDimensions is now an array of arrays, each containing three numbers
  console.log(smallDimensions);
  // calculate cubic feet
  const cubicFeet = smallDimensions.map((dim) => {
    return dim.reduce((acc: number, curr: number) => acc * curr);
  });
  console.log(cubicFeet);

  const smallPrices = await page.$$eval(
    '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b',
    (elements) => elements.map((el) => el.textContent?.trim())
  );

  console.log(smallPrices);

  const smallPricePerCubicFoot = smallPrices.map((price, index) => {
    const numericPrice = parseFloat(price!.replace('$', ''));
    const pricePerCubicFoot = numericPrice / cubicFeet[index];
    return pricePerCubicFoot.toFixed(2);
  });

  console.log(smallPricePerCubicFoot);

  // repeat for other locations
  // might need to handle pagination

  // '#small_IndoorStorage_RoomList > li.divider.uhjs-reserve-only > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b'

  // const pricePerSquareFoot = await page.$$eval(

  await page.goBack({ waitUntil: 'networkidle2' });

  await page.click(
    '#storageResults > li:nth-child(2) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a'
  );

  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  // await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const smallDimensions2 = await page.$$eval(
    '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4',
    (elements) =>
      elements.map((el) => {
        const dimensions = el.textContent?.trim().split('|')[1].trim() ?? '';
        const numbers = dimensions
          .split(' x ')
          .map((dim: string) => parseInt(dim));
        return numbers; // returns an array of numbers for each element
      })
  );

  // smallDimensions is now an array of arrays, each containing three numbers
  console.log(smallDimensions2);
  // calculate cubic feet
  const cubicFeet2 = smallDimensions.map((dim) => {
    return dim.reduce((acc: number, curr: number) => acc * curr);
  });
  console.log(cubicFeet2);

  const smallPrices2 = await page.$$eval(
    '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b',
    (elements) => elements.map((el) => el.textContent?.trim())
  );

  console.log(smallPrices2);

  const smallPricePerCubicFoot2 = smallPrices2.map((price, index) => {
    const numericPrice = parseFloat(price!.replace('$', ''));
    const pricePerCubicFoot = numericPrice / cubicFeet2[index];
    return pricePerCubicFoot.toFixed(2);
  });

  console.log(smallPricePerCubicFoot2);

  // await console.log('went back');

  // setTimeout(async () => {
  //   await browser.close();
  // }, 5000);
}

uHaul(storageFacilities.uHaul);
