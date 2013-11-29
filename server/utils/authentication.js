// API Authentication
//
// Usage:
//
//   var auth = require('./path/to/this/module');
//   app.post(url, auth, function (req, res) {
//     ...
//   });
//
// Simply supplying the auth object as the second parameter to your express
// request methods will check the username and password and generate a 401
// response if the credentials are bad.

var express = require('express');
var User = require('../models/user');

module.exports = express.basicAuth(function(user, pass) {
  User.findOne({login: user}, function (err, user) {
    if (err) throw err;
    user.checkPassword(pass, function (err, isMatch) {
      if (err) throw err;
      return isMatch;
    })
  })
});
