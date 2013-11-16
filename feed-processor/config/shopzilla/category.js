var api = require('./api'),
    shopzillaHome = require('./home');

module.exports = {
 home: shopzillaHome,
 filters: {
   "publisherId": api.publisherId,
   "apiKey": api.apiKey,
   "format": "json"
 }
};
