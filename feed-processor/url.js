var api = require('./config/api');

var Url = function () {
  var home = 'http://catalog.bizrate.com/services/catalog/v1/us/';

  var productFilters = {
    'apiKey' :  api.key,
    'publisherId' :  api.id,
    'keyword' : 'shoes',
    'results' : '2'
  };

  var generateFilterString = function (filters) {
    var result = [];
    for (k in filters) {
      result.push(k + '=' + filters[k]);
    }
    return result.join('&');
  };

  var _generate = function () {
    return home + 'product?' + generateFilterString(productFilters) + '&format=json';
  };

  return {
    generate : _generate
  };
}();

module.exports = Url;
