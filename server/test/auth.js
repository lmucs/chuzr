require('./utils')

var should = require('should');
var request = require('supertest');  
var url = require('../config/config').test.url;
var userOne = {
  name: {
    first: 'Luna',
    last: 'Bar'
  },
  email: 'lunabar@example.com',
  login: 'lunaluna',
  reputation: 1000,
  socialHandle: 'lunabar',
  avatarURL: 'http://i.lunabar.com/luna.png',
  hashedPassword: 'qiyh4XPJGsOZ2MEAyLkfWqeQ'
};

describe('User Authentication', function(){

  describe('#accepted', function () {
    it('should return 200 while trying to post', function (done) {
      User.create(
      request(url).post('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should
  )}
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