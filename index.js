const request = require('request-promise');
const cheerio = require('cheerio');

const URL = "https://www.imdb.com/title/tt1477834/";

(async () => {
  const response = await request(URL);
  let $ = cheerio.load(response);

  let titleMovie = $('.title_wrapper > h1').text();
  let ratingValue = $('.ratingValue').text();
  console.log(titleMovie);
  console.log(ratingValue.trim());

})();