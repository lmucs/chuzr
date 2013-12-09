var http = require('http'),
    parse = require('./parser')["json"],
    massage = require('./massager'),
    load = require('./loader');

var Ingestor = function () {

  var _retrieveData = function (url, process) {
    var data = '';
    http.get(url, function (res) {
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        process(data);
      });
    }).on('error', function (err) {
    });
  };

  var _products = function (url, category, db, callback) {
    _retrieveData(url, function (data) {
      var result = parse(data),
          chuzrProducts = massage.products(result, category);
      console.log("Loading products from: " + category.name);
      load.products(chuzrProducts, db, callback);
    });
  };

  var _taxonomy = function (url, db, callback) {
    _retrieveData(url, function (data) {
      var result = parse(data),
          shopzillaTaxonomy = massage.taxonomy(result);
      load.taxonomy(shopzillaTaxonomy, db, callback);
    });
  };

  return {
    products: _products,
    taxonomy: _taxonomy
  };
}();

module.exports = Ingestor;
