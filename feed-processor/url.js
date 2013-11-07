var api = require('./config/api'),
    filter = require('./filters/filter'),
    product = require('./filters/product'),
    format = require('./filters/format');

var Url = function () {

  var home = 'http://catalog.bizrate.com/services/catalog/v1/us/',
      filterQueries = [
        api,
        product,
        format
      ].map(filter.query).join('&');

  var _generate = function () {
    return home + 'product?' + filterQueries;
  };

  return {
    generate : _generate
  };

}();

module.exports = Url;
