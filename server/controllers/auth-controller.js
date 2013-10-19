var express = require('express');

module.exports = function (app) {
  var auth = express.basicAuth(function(user, pass, callback) {
    //To be replaced with actual users and passes
    var result = (user === 'testUser' && pass === 'testPass');
    callback(null, result);
  });
}