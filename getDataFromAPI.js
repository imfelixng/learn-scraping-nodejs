const request = require('request-promise');
const cheerio = require('cheerio');

const URL = "https://www.imdb.com/title/tt0468569/";

(async () => {
  const response = await request(
    {
      uri: URL,
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
        'ache-control': 'max-age=0',
        'referer': 'https://www.imdb.com/poll/Y_692Vc6zh4/results?answer=1&ref_=po_nr',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
      }
    }
  );
  let $ = cheerio.load(response);

  let titleMovie = $('.title_wrapper > h1').text();
  let ratingValue = $('.ratingValue').text();

  console.log(titleMovie, ratingValue.trim());

})();