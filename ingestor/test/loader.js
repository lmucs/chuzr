var env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env],
    MongoClient = require('mongodb').MongoClient;

    assert = require('assert'),
    load = require('../loader'),
    db = {};

var objectComparator = function (a, b) {
  if (a._id > b._id) return 1;
  if (a._id < b._id) return -1;
  return 0;
};

before(function (done) {
  MongoClient.connect(config.dbPath, function (err, database) {
    if (err) throw err;
    db = database;
    done();
  });
});

after(function () {
  db.close();
});

describe('Loader', function () {

  describe('#taxonomy', function () {

    it('should put a massive taxonomy tree object in the database', function (done) {
      var dummy = {"bigThing":{ "happy": "panda", "programming": "panda", "sad": "panda"}},
          taxonomy = db.collection('taxonomy');
      db.collection('taxonomy').drop();
      load.taxonomy(dummy, db, function () {
        taxonomy.count(function(err, count) {
          assert.equal(1, count);
          done();
        });
      });
    });

  });

  describe('#products', function () {

    it('should put stuff in the database', function (done) {
      var products = db.collection('products'),
          someProducts = [ { "happy": "panda"} , {"programming": "panda"}, {"sad": "panda"}];
      products.drop();
      load.products(someProducts, db, function () {
        products.count(function(err, count) {
          assert.equal(3, count);
          products.find().toArray(function(err, results) {
            results = results.sort(objectComparator),
            someProducts = someProducts.sort(objectComparator);
            assert.deepEqual(someProducts, results);
            done();
          });
        });
      });
    });

  });


});

