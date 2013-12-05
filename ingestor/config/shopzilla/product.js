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
    "imageOnly": true
  }
};
