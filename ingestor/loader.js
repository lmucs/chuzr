var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    MongoClient = require('mongodb').MongoClient;

var Loader = function () {


  var _products = function (chuzrProducts, db) {
    var products = db.collection('products');
    for (p in chuzrProducts) {
      var product = chuzrProducts[p];
      products.insert(product, function (err, res) {
        if (err) throw err;
      });
    }
  };


  var _taxonomy = function (shopzillaTaxonomy) {
    MongoClient.connect(config.dbPath, function(err, db) {
      if (err) throw err;
      var taxonomy = db.collection('taxonomy');
      taxonomy.drop();
      taxonomy.insert(shopzillaTaxonomy, function (err, result) {
        if (err) throw err;
        console.log('All your taxonomy data-base belongs to us\n');
        db.close();
      });
    });
  };

  return {
    products: _products,
    taxonomy: _taxonomy
  };

}();

module.exports = Loader;
