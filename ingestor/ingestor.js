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

  var _products = function (url, category, db) {
    _retrieveData(url, function (data) {

      var result = parse(data),
      chuzrProducts = massage.products(result, category),
      products = db.collection('products');

        for (p in chuzrProducts) {
          var product = chuzrProducts[p];
          products.insert(product, function (err, res) { if (err) throw err; });
        }

    });
  };

  var _taxonomy = function (url) {
    _retrieveData(url, function (data) {

      var result = parse(data),
          shopzillaTaxonomy = massage.taxonomy(result);

      MongoClient.connect(config.dbPath, function(err, db) {
        if (err) throw err;
        db.collection('taxonomy').drop();
        var taxonomy = db.collection('taxonomy');
        taxonomy.insert(shopzillaTaxonomy, function (err, result) {
          if (err) throw err;
          console.log('All your data-base belongs to us');
          db.close();
        });
      });

    });
  };

  return {
    products: _products,
    taxonomy: _taxonomy
  };
}();

module.exports = Ingestor;
