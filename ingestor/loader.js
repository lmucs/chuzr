var Loader = function () {


  var _products = function (chuzrProducts, db, callback) {
    var products = db.collection('products');
    for (p in chuzrProducts) {
      var product = chuzrProducts[p];
      products.insert(product, function (err, res) {
        if (err) throw err;
      });
    }
    callback();
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
