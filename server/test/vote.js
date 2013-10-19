require('./utils');

var should = require('should');
var request = require('supertest');  
var Vote = require('../models/vote');
var url = require('../config/config').test.url;

var voteOne = {
  userId: 1,
  productId: 32,
  rating: 8
};

var voteTwo = {
  userId: 0,
  productId: 30,
  rating: 4
};

var voteThree = {
  userId: 0,
  productId: 15,
  rating: 9
};

var voteFour = {
  userId: 2,
  productId: 4,
  rating: 10
};


describe('Votes Model', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      Vote.create(voteOne, function (err) {
        if (err) throw err;
        done();
      })
    })
    it('should assign all properties on creation', function (done) {
      Vote.create(voteOne, function (err, vote) {
        should.not.exist(err);
        vote.userId.should.equal(1)
        vote.productId.should.equal(32)
        vote.rating.should.equal(8)
        done();
      })
    })
  })

});

describe('Votes Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no votes', function (done) {
      request(url).get('/votes').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    it('should get by id without error', function (done) {
      // Create the product.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that product by id.
        request(url).get('/votes/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
        })

        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.body.userId.should.equal(1)
        res.body.productId.should.equal(32)
        res.body.rating.should.equal(8)
        Object.keys(res.body).length.should.equal(5);
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the product.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Delete that product.
        request(url).del('/votes/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
        })

        done();
      })
    })
  }) 


});
