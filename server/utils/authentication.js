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

module.exports = express.basicAuth(function(user, pass) {
    
  // To be replaced with actual users and passes
  return (user === 'testUser' && pass === 'testPass');
});
