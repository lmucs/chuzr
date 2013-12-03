var env = process.env.NODE_ENV || 'development',
    config = require('../config/config')[env],
    MongoClient = require('mongodb').MongoClient;

    assert = require('assert'),
    load = require('../loader');

// MongoClient.connect(config.dbPath, function (err, db) {
//
//   if (err) throw err;
//
//   describe('Loader', function () {
//
//     // describe('#products', function () {
//
//     //   it('should put stuff in the database', function () {
//     //     var products = db.collection('products'),
//     //         someProducts = [ { "happy": "panda"} , {"programming": "panda"}, {"sad": "panda"}];
//     //     load.products(someProducts, db);
//     //     products.count(function(err, count) {
//     //       assert.equal(3, count);
//     //     });
//     //     products.find().toArray(function(err, results) {
//     //       assert.deepEqual(results, someProducts);
//     //     });
//     //   });
//
//     // });
//
//     describe('#taxonomy', function () {
//
//       it('should put a massive taxonomy tree object in the database', function (done) {
//         var dummy = {"bigThing":{ "happy": "panda", "programming": "panda", "sad": "panda"}},
//             taxonomy = db.collection('taxonomy');
//         load.taxonomy(dummy, db, done);
//         taxonomy.count(function(err, count) {
//           assert.equal(1, count);
//         });
//       });
//
//     });
//
//   });
//
// });
