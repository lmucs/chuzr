var express = require('express');

module.exports = function (app) {
  var auth = express.basicAuth(function(user, pass) {
    //To be replaced with actual users and passes
    var result = (user === 'testUser' && pass === 'testPass');
    return result;
  });
}