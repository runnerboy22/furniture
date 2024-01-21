// import puppeteer from 'puppeteer';
import * as puppeteer from 'puppeteer';

export interface StorageFacility {
  uHaul: string;
}

// type LocationData = {
//   // dimensions: [string];
//   location: {
//     small: { price: number[]; cubic: number[]; pricePerCubic: number[] };
//     medium: { price; cubic; pricePerCubic };
//     // smallDimensions: number[];
//     // smallPricePerCubicFoot: number;
//   };
// };

type PriceData = {
  price: string;
  cubic: number;
  pricePerCubic: number;
};
type LocationPricePairs = {
  [location: string]: string;
};
type LocationData = {
  small: PriceData;
  medium?: PriceData;
};
interface zipCode {
  WC: string;
}

const zipCode = { WC: '94598' };

export const storageFacilities: StorageFacility = {
  uHaul: 'https://www.uhaul.com/Storage/Online-Move-In/',
};

export const launch = async (url: string) => {
  const browser = await puppeteer.launch({
    // headless: 'new',
    headless: false,
  });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const locationPricePairs = await area(page, zipCode);

  setTimeout(async () => {
    await browser.close();
    console.log('Browser closed after 15 seconds');
  }, 15000);

  return locationPricePairs;
};

const area = async (page: puppeteer.Page, zipCode: zipCode) => {
  await page.type('#movingFromInput', zipCode.WC);

  await page.click(
    '#locationSearchForm > fieldset > div > div > div.cell.large-2.align-self-bottom > button'
  );

  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  const locations = await page.$$eval(
    '#storageResults > li:nth-child(n) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a',
    (elements) => elements.map((el) => el.textContent?.trim())
  );
  const cheapestPrices = await page.$$eval(
    '#storageResults > li:nth-child(n) > div:nth-child(1) > div.cell.auto > div:nth-child(2) > div.cell.medium-auto.large-3.text-right.show-for-medium > dl > dd > div > div:nth-child(2) > span',
    (elements) => elements.map((el) => el.textContent?.trim())
  );

  const locationPricePairs: { [location: string]: string } = {};

  locations.forEach((location, index) => {
    if (location && cheapestPrices[index]) {
      const trimmedLocation = location.trim();
      const trimmedPrice = cheapestPrices[index]!.trim();
      locationPricePairs[trimmedLocation] = trimmedPrice;
    }
  });
  return locationPricePairs;
};

// export async function uHaul(url: string): Promise<LocationPricePairs> {
//   const page = await launch(url);
//   const locationPricePairs = await area(page, zipCode);
//   console.log('locationPricePairs', locationPricePairs);
//   return locationPricePairs;
// }

// uHaul(storageFacilities.uHaul);

// await page.waitForTimeout(5000);
// await new Promise((resolve) => setTimeout(resolve, 5000));

// click into each location to determine prices, square ft, and price per sq ft
// spawn multiple tabs to do this... or just do it sequentially with the back button
// tradeoff: more compute vs slower

// Only add to the object if both location and price are defined and not empty

let allLocations: Record<string, LocationData> = {}; // let allLocations: Record<string, LocationData> = {};
// let allLocations: { [location: string]: any } = {
// smallDimensions: [],
// smallPrices: [],
// smallPricePerCubicFoot: [],
// }
// }
// - build location object: each location will have an object of objects?
// Locations = {
// dublin: { small: { price, cubic, price/cubic},
//     medium: { price, cubic, price/cubic}
// }, livermore: { small: { price, cubic, price/cubic},
//     medium: { price, cubic, price/cubic}
// const locationData = async (uhaul) => {
export async function getSize(location: string) {
  // const size = Object.keys(await uHaul(location)).length;
  // console.log('size', size);
  // for (let i = 1; i < size; i++) {
  // if (location[i] === undefined) {
  //   console.log('location undefined');
  //   continue;
  // }
  await page.waitForNavigation({ waitUntil: 'networkidle2' });
  const selector =
    '#storageResults > li:nth-child(1) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a';
  await page.click(selector);
  await console.log('clicked');
  // const numDims = await page.$$eval(
  //   `#small_IndoorStorage_RoomList > li:nth-child(n
  //   ) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4`,
  //   (elements) => elements.map((el) => el.textContent?.trim())
  // );
  // console.log('numDims', numDims);
}
// }
// };
//     // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
// await page.waitForNavigation({ waitUntil: 'networkidle0' });

//     // need nested for loop to iterate through each location
//     let smallDimensions: number[] = [];
//     let medDimensions: number[] = [];
//     let largeDimensions: number[] = [];

// const numDims = await page.$$eval(
//   `#small_IndoorStorage_RoomList > li:nth-child(n
//   ) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4`,
//   (elements) => elements.map((el) => el.textContent?.trim())
// );
//     for (let i = 0; i < numDims.length; i++) {
//       const smallDimensionSelector = `#small_IndoorStorage_RoomList > li:nth-child(${
//         i + 1
//       }) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4`;
//       await page.waitForSelector(smallDimensionSelector);

//       smallDimensions = await page.$eval(smallDimensionSelector, (element) => {
//         const dimensions =
//           element.textContent?.trim().split('|')[1].trim() ?? '';
//         const numbers = dimensions
//           .split(' x ')
//           .map((dim: string) => parseInt(dim));

//         return numbers; // returns an array of numbers for each element
//       });
//       console.log('smallD', smallDimensions);
//     }

//     // med
//     const medNumDims = await page.$$eval(
//       `#medium_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4`,
//       (elements) => elements.map((el) => el.textContent?.trim())
//     );
//     if (medNumDims) {
//       for (let i = 0; i < medNumDims.length; i++) {
//         const medDimensionSelector = `#medium_IndoorStorage_RoomList > li:nth-child(${
//           i + 1
//         }) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4`;
//         await page.waitForSelector(medDimensionSelector);

//         medDimensions = await page.$eval(medDimensionSelector, (element) => {
//           const dimensions =
//             element.textContent?.trim().split('|')[1].trim() ?? '';
//           const numbers = dimensions
//             .split(' x ')
//             .map((dim: string) => parseInt(dim));

//           return numbers; // returns an array of numbers for each element
//         });
//         console.log('mid', medDimensions);
//       }
//     }

//     // add med and large dimensions plus error handling for none available
//     const cubicFeet = smallDimensions.reduce(
//       (acc: number, curr: number) => acc * curr,
//       1
//     );
//     // const selector = `#small_IndoorStorage_RoomList > li:nth-child(${
//     //   i + 1
//     // }) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b`;

//     // await page.waitForSelector(selector);
//     // const smallPrices = await page.$eval(selector, (element) =>
//     //   element.textContent?.trim()
//     // );

//     // const numericPrice = parseFloat((smallPrices || '').replace('$', ''));
//     // const smallPricePerCubicFoot = numericPrice / cubicFeet;

//     await page.goBack({ waitUntil: 'networkidle2' });
//     // const small = {
//     //   price: smallPrices,
//     //   cubic: cubicFeet,
//     //   pricePerCubic: smallPricePerCubicFoot,
//     // };
//     // allLocations[locations[i]] = { small };

//     console.log('all locations', allLocations);
//   }

//   // await page.click(
//   //   '#storageResults > li:nth-child(1) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a'
//   // );

//   // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
//   // // await page.waitForNavigation({ waitUntil: 'networkidle0' });

//   // const smallDimensions = await page.$$eval(
//   //   '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4',
//   //   (elements) =>
//   //     elements.map((el) => {
//   //       const dimensions = el.textContent?.trim().split('|')[1].trim() ?? '';
//   //       const numbers = dimensions
//   //         .split(' x ')
//   //         .map((dim: string) => parseInt(dim));
//   //       return numbers; // returns an array of numbers for each element
//   //     })
//   // );

//   // // smallDimensions is now an array of arrays, each containing three numbers
//   // console.log(smallDimensions);
//   // // calculate cubic feet
//   // const cubicFeet = smallDimensions.map((dim) => {
//   //   return dim.reduce((acc: number, curr: number) => acc * curr);
//   // });
//   // console.log(cubicFeet);

//   // const smallPrices = await page.$$eval(
//   //   '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b',
//   //   (elements) => elements.map((el) => el.textContent?.trim())
//   // );

//   // console.log(smallPrices);

//   // const smallPricePerCubicFoot = smallPrices.map((price, index) => {
//   //   const numericPrice = parseFloat(price!.replace('$', ''));
//   //   const pricePerCubicFoot = numericPrice / cubicFeet[index];
//   //   return pricePerCubicFoot.toFixed(2);
//   // });

//   // console.log(smallPricePerCubicFoot);

//   // // repeat for other locations
//   // // might need to handle pagination

//   // // '#small_IndoorStorage_RoomList > li.divider.uhjs-reserve-only > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b'

//   // // const pricePerSquareFoot = await page.$$eval(

//   // await page.goBack({ waitUntil: 'networkidle2' });

//   // await page.click(
//   //   '#storageResults > li:nth-child(2) > div:nth-child(1) > div.cell.auto > div:nth-child(1) > div.cell.small-8.medium-auto > h3 > a'
//   // );

//   // await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
//   // // await page.waitForNavigation({ waitUntil: 'networkidle0' });

//   // const smallDimensions2 = await page.$$eval(
//   //   '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div:nth-child(2) > div > div.cell.auto > h4',
//   //   (elements) =>
//   //     elements.map((el) => {
//   //       const dimensions = el.textContent?.trim().split('|')[1].trim() ?? '';
//   //       const numbers = dimensions
//   //         .split(' x ')
//   //         .map((dim: string) => parseInt(dim));
//   //       return numbers; // returns an array of numbers for each element
//   //     })
//   // );

//   // // smallDimensions is now an array of arrays, each containing three numbers
//   // console.log(smallDimensions2);
//   // // calculate cubic feet
//   // const cubicFeet2 = smallDimensions.map((dim) => {
//   //   return dim.reduce((acc: number, curr: number) => acc * curr);
//   // });
//   // console.log(cubicFeet2);

//   // const smallPrices2 = await page.$$eval(
//   //   '#small_IndoorStorage_RoomList > li:nth-child(n) > div > div.grid-x.grid-margin-x.align-left.medium-grid-expand-x > div.cell.medium-4.large-3.align-self-top > dl > dd > b',
//   //   (elements) => elements.map((el) => el.textContent?.trim())
//   // );

//   // console.log(smallPrices2);

//   // const smallPricePerCubicFoot2 = smallPrices2.map((price, index) => {
//   //   const numericPrice = parseFloat(price!.replace('$', ''));
//   //   const pricePerCubicFoot = numericPrice / cubicFeet2[index];
//   //   return pricePerCubicFoot.toFixed(2);
//   // });

//   // console.log(smallPricePerCubicFoot2);

//   // await console.log('went back');

//   // setTimeout(async () => {
//   //   await browser.close();
//   // }, 5000);
// }

// uHaul(storageFacilities.uHaul);
