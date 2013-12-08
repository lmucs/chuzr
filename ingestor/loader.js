var async = require('async');

var Loader = function () {


  var _products = function (chuzrProducts, db, callback) {
    var products = db.collection('products');
    async.each(
      chuzrProducts,
      function(item, asyncCallback) {
        products.insert(item, function (err, res) {
          var asyncErr = err || null;
          asyncCallback(asyncErr);
        });
      },
      function (err) {
        if (err) throw err;
        callback();
      });
  };


  var _taxonomy = function (shopzillaTaxonomy, db, callback) {
    var taxonomy = db.collection('taxonomy');
    taxonomy.insert(shopzillaTaxonomy, function (err, result) {
      if (err) throw err;
      callback();
    });
  };

  return {
    products: _products,
    taxonomy: _taxonomy
  };

}();

module.exports = Loader;
