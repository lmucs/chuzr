var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    MongoClient = require('mongodb').MongoClient,

    ingest = require('./ingestor'),
    url = require('./url'),
    category = require('./config/shopzilla/category')
    categoryUrl = url.generate(category);

MongoClient.connect(config.dbPath, function(err, db) {

  if (err) throw err;

  console.log("Grabbing Shopzilla taxonomy tree\n");
  db.collection('taxonomy').drop();
  ingest.taxonomy(categoryUrl, db, function () {
    db.close();
  });

});
