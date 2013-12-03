var http = require('http'),
    parse = require('./parser')["json"],
    massage = require('./massager'),
    load = require('./loader'),

    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    MongoClient = require('mongodb').MongoClient;

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

  var _products = function (url, category) {
    _retrieveData(url, function (data) {
      var result = parse(data),
          chuzrProducts = massage.products(result, category);
      load.products(chuzrProducts);
    });
  };

  var _taxonomy = function (url) {
    _retrieveData(url, function (data) {
      var result = parse(data),
          shopzillaTaxonomy = massage.taxonomy(result);
      load.taxonomy(shopzillaTaxonomy);
    });
  };

  return {
    products: _products,
    taxonomy: _taxonomy
  };
}();

module.exports = Ingestor;
