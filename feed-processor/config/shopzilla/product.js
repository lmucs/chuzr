var api = require('./api'),
    shopzillaHome = require('./home');

module.exports = {
  home: shopzillaHome,
  filters: {
    "publisherId": api.publisherId,
    "apiKey": api.apiKey,
    "keyword": "shoes",
    "results": "10",
    "format": "json"
  }
};
