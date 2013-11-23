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

  var _generate = function (item) {
    return item.home + item.service + '?' + _joinFilters(item.filters);
  };

  return {
    generate: _generate
  };

}();

module.exports = Url;
