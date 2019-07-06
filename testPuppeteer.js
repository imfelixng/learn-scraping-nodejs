const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.traveloka.com/vi-vn/hotel/vietnam/mercure-danang-french-village-bana-hills-1000000537311?spec=05-07-2019.06-07-2019.1.2.HOTEL.1000000537311.Mercure%20Danang%20French%20Village%20Bana%20Hills.11');
  const data = await page.$('._3tpQ3 span');
  console.log(data);
  await browser.close();
})();