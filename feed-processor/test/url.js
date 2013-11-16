var assert = require('assert'),
    url = require('../url'),
    shopzillaProduct = require('../config/shopzilla/product'),
    shopzillaCategory = require('../config/shopzilla/category');

var joinFilters = function (filters) {
    var result = [];
    for (k in filters) {
      result.push(k + '=' + filters[k]);
    }
    return result.join('&');
};

describe('Url', function () {

  describe('#shopzillaProduct', function () {

    it('should generate a url based on the config file', function () {
      var urlString = shopzillaProduct.home + 'product?' + joinFilters(shopzillaProduct.filters);
      assert.equal(urlString, url.shopzillaProduct);
    })

  });

  describe('#shopzillaCategory', function () {

    it('should generate a url based on the config file', function () {
      var urlString = shopzillaCategory.home + 'category?' + joinFilters(shopzillaCategory.filters);
      assert.equal(urlString, url.shopzillaCategory);
    })

  });

});
