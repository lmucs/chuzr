var api = require('./api'),
    shopzillaHome = require('./home');

module.exports = {
 home: shopzillaHome,
 service: "taxonomy",
 filters: {
   "publisherId": api.publisherId,
   "apiKey": api.apiKey,
   "format": "json"
 }
};
