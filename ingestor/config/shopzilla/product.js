var api = require('./api'),
    shopzillaHome = require('./home');

module.exports = {
  home: shopzillaHome,
  service: "product",
  filters: {
    "publisherId": api.publisherId,
    "apiKey": api.apiKey,
    "results": "250", //max product pull
    "format": "json",
    // minprice would be a nice filter for more well documented products
    // however, maxprice has to be used in tandem
    // maybe someone on frontend can decide a "high enough" max price
    // "minPrice": 0,
    "imageOnly": true
  }
};
