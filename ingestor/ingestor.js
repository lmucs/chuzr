var http = require('http'),
    massage = require('./massager'),
    parser = require('./parser'),
    parse = parser["json"],

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

  var _products = function (url) {
    _retrieveData(url, function (data) {
      var result = parse(data),
          chuzrProducts = massage.products(result);
      console.log('use ' + config.db);
      for (p in chuzrProducts) {
        var product = JSON.stringify(chuzrProducts[p]);
        console.log('db.products.insert(' + product + ');');
      }
    });
  };

  var _taxonomy = function (url) {
    _retrieveData(url, function (data) {
      var result = parse(data),
          shopzillaTaxonomy = massage.taxonomy(result);
      console.log('use ' + config.db);
      console.log('db.taxonomy.insert(%j);', shopzillaTaxonomy);
    });
  };

  return {
    products: _products,
    taxonomy: _taxonomy
  };
}();

module.exports = Ingestor;
