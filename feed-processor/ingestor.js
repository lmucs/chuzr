var http = require('http');

var Ingestor = function () {

  var _retrieveData = function (url, parse) {
    var data = '';
    http.get(url, function (res) {
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        var result = parse(data);
        var productArray = result.products.product;
        for (p in productArray) {
            console.log('db.products.insert(' + JSON.stringify(productArray[p]) + ');');
        }
      });
    }).on('error', function (err) {
    });
  };

  var _json = function (url) {
    _retrieveData(url, function (data) {
      return JSON.parse(data);
    });
  };

  return {
    json : _json
  };
}();

module.exports = Ingestor;
