/*
 * Require this file at the top of every file that uses Mongo for testing.
 * It ensures each test is run in the test environment, that each test begins
 * by connecting to the test database and empties out its collections, and
 * ends every test by disconnecting.
 */

var config = require('../config/config');
var mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

beforeEach(function (done) {

  function clearCollections() {
    for (var collection in mongoose.connection.collections) {
      mongoose.connection.collections[collection].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.test.db, function (err) {
      if (err) throw err;
      return clearCollections();
    });
  } else {
    return clearCollections();
  }
});

afterEach(function (done) {
  mongoose.disconnect();
  return done();
});
