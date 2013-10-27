var express = require('express');

module.exports = {
  auth : express.basicAuth(function(user, pass) {
    //To be replaced with actual users and passes
    return (user === 'testUser' && pass === 'testPass');
  })
}