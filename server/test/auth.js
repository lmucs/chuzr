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
    it('should return 201 while trying to post', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should return 200 while trying to put', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/users/' + res.body[0]._id).auth('testUser', 'testPass').send({reputation: 1001}).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  });
  
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
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
      });
      request(url).get('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/users/' + res.body[0]._id).send({reputation: 1001}).auth('testUsers', 'letmein').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          res.body.should.eql([]);
          done();
        })
      })
    })
  });
});