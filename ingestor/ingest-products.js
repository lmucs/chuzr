var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    MongoClient = require('mongodb').MongoClient,
    async = require('async'),

    ingest = require('./ingestor'),
    url = require('./url'),
    product = require('./config/shopzilla/product'),
    productUrlRaw = url.generate(product),
    productUrl = '';

MongoClient.connect(config.dbPath, function(err, db) {

  if (err) throw err;

  console.log("Connected to database\n");
  db.collection('products').drop();
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

      if (err) throw err;

      var categories = results[0].idsAndNames,
          ingestionProcesses = [];

      console.log("Product ingestion beginning\n");
      for (c in categories) {
        var category = categories[c],
            categoryFilter = "&categoryId=" + category.id,
            productUrl = productUrlRaw + categoryFilter;

        ingestionProcesses.push(function (u, c) {
          return function (callback) {
            ingest.products(u, c, db);
            callback();
          };
        }(productUrl, category));
      }

      async.parallel(ingestionProcesses, function (res) {
        db.close();
      });

    }
  );

});
