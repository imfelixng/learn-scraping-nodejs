const rp = require('request-promise');
const cheerio = require('cheerio');
const fs = require('fs');
const request = require('request');


const URLS = [
  {
    url: "https://www.imdb.com/title/tt0468569/",
    id: 'tt0468569'
  },
  {
    url: "https://www.imdb.com/title/tt4154796/",
    id: 'tt4154796'
  }
];

(async () => {
  const moviesData = [];
  for (let movie of URLS) {
    const response = await rp(
      {
        uri: movie.url,
        headers: {
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
          'ache-control': 'max-age=0',
          'referer': 'https://www.imdb.com/poll/Y_692Vc6zh4/results?answer=1&ref_=po_nr',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36'
        },
        gzip: true // get data when gzip used
      }
    );
    let $ = cheerio.load(response);
  
    let titleMovie = $('.title_wrapper > h1').text().trim();
    let ratingValue = $('.ratingValue > strong > span').text().trim();
    let poster = $(".poster > a >img").attr('src').trim();
    let totalRatings = $('.imdbRating > a > span').text().trim();
    let releaseDay = $('.title_wrapper > .subtext > a:last-child').text().trim();
    let popularity = $('#title-overview-widget > div.plot_summary_wrapper > div.titleReviewBar > div:nth-child(5) > div.titleReviewBarSubItem > div:nth-child(2) > span').text().trim();

    const genres = [];
    $('.title_wrapper > .subtext > a[title!="See more release dates"]').each((i, elm) => {
      genres.push($(elm).text().trim());
    }) 
    moviesData.push({
      title: titleMovie,
      rating: +ratingValue,
      poster,
      totalRatings,
      releaseDay,
      genres,
    });

    let file = fs.createWriteStream(`${movie.id}.jpg`) // create file

    // request(poster).pipe(file); // create image from url

    try {
      await new Promise((resolve, reject) => {
        request(poster).pipe(file)
        .on('finish', () => {
          console.log('Success');
          resolve();
        })
        .on('error', (error) => {
          reject(error);
        });
      })
  
      debugger;
    } catch (error) {
      console.log(error);
    }

  }

  // fs.writeFileSync('./data.json', JSON.stringify(moviesData), 'utf-8');

})();