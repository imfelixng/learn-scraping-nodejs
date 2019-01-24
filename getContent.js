const Nightmare = require('nightmare')
const cheerio = require('cheerio');
const nightmare = Nightmare({ show: true });
const url = 'https://www.traveloka.com/vi-vn/hotel/search?spec=25-01-2019.26-01-2019.1.1.HOTEL_GEO.10010083.Tha%CC%80nh%20ph%C3%B4%CC%81%20%C4%90%C3%A0%20N%E1%BA%B5ng.2';

nightmare
  .goto(url)
  .wait('body')
  .wait('._35oqk')
  .wait('._1h2bd')
  .evaluate(() => document.querySelector('body').innerHTML)
  .end()
  .then(response => {
    console.log(getData(response));
  }).catch(err => {
    console.log(err);
  });

let getData = html => {
  data = [];
  const $ = cheerio.load(html);
  console.log($('._1h2bd').html())
  return data;
}
