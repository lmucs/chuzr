require('./utils')

var should = require('should');
var request = require('supertest');  
var url = require('../config/config').test.url;

describe('User Authentication', function(){

  describe('#denied', function () {
    it('should return 401 response code while trying to post', function (done) {
      request(url).post('/users').auth('testUser', 'testPast').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        res.body.should.eql([]);
        done();
      })
    })
    it('should return 401 while trying to put', function (done) {
      request(url).put('/users').auth('testUsers', 'letmein').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        res.body.should.eql([]);
        done();
      })
    })
  });
});