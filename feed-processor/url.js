var product = require('./config/shopzilla/product'),
    category = require('./config/shopzilla/category');

var Url = function () {

  var _joinFilters = function (filters) {
    var result = [];
    for (k in filters) {
      result.push(k + '=' + filters[k]);
    }
    return result.join('&');
  };

  var _generate = function (item, itemName) {
    return item.home + itemName + '?' + _joinFilters(item.filters);
  };

  return {
    shopzillaProduct: _generate(product, 'product'),
    shopzillaCategory: _generate(category, 'category')
  };

}();

module.exports = Url;
