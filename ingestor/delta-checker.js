var env = process.env.NODE_ENV || 'development',
    xml2js = require('xml2js'),
    MongoClient = require('mongodb').MongoClient, 
    config = require('./config/config')[env],
    massager = require('./massager');

var DeltaChecker = function() {
  
  var _checkProduct = function(updatesInXml) {
    var parseString = xml2js.parseString;
    parseString(updatesInXml, function (err, result) {
      if (err) throw err;
      MongoClient.connect(config.dbPath, function(err, db) {
        var products = db.collection('products');
        products.findOne({shopzillaId : result.product['-id']}, function(err, original) {
          if (err) throw err;
          if (original) {
            original = massager.updatedProduct(original, result.product);
            products.update({shopzillaId: original.shopzillaId}, original);
          }
        })
      })
      db.close();
    })
  }
 return {
        checkProduct: _checkProduct
        };
}();

module.exports = DeltaChecker;
