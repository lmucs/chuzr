var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    MongoClient = require('mongodb').MongoClient;

    ingest = require('./ingestor'),
    url = require('./url'),
    product = require('./config/shopzilla/product'),
    productUrlRaw = url.generate(product),
    productUrl = '';

MongoClient.connect(config.dbPath, function(err, db) {

  if (err) throw err;

  var taxonomy = db.collection('taxonomy');
  taxonomy.aggregate([
    { $unwind : "$taxonomy.categories.category" },
    { $unwind : "$taxonomy.categories.category.children.category"},
    { $project : {
        _id : 0,
        "taxonomy.categories.category.children.category.id" : 1,
        "taxonomy.categories.category.children.category.name" : 1
      }
    },
    { $group : {
      _id : 0,
      idsAndNames : {$addToSet : "$taxonomy.categories.category.children.category"},
      }
    }],
    function (err, results) {
      var categories = results[0].idsAndNames;
      for (c in categories) {
        var categoryFilter = "&categoryId=" + categories[c].id;
        productUrl = productUrlRaw + categoryFilter;
        ingest.products(productUrl);
      }
      db.close();
    }
  );

});
