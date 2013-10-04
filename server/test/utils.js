/*
 * Require this file in every test file that uses Mongo for testing.
 * It ensures every test starts with connecting to the test database
 * and empties it out, and ends every test by disconnecting.
 */

var config = require('../config/config');
var mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

beforeEach(function (done) {

  function clearDB() {
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  if (mongoose.connection.readyState === 0) {
    mongoose.connect(config.test.db, function (err) {
      if (err) throw err;
      return clearDB();
    });
  } else {
    return clearDB();
  }
});

afterEach(function (done) {
  mongoose.disconnect();
  return done();
});
