var api = require('./api'),
    shopzillaHome = require('./home');

module.exports = {
  home: shopzillaHome,
  filters: {
    "publisherId": api.publisherId,
    "apiKey": api.apiKey,
    "categoryId": 1,
    "results": "250", //max product pull
    "format": "json",
    "minPrice": 0,
    "imageOnly": true
  }
};
