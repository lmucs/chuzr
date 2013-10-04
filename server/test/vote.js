require('./utils');

var User = require('../models/vote');

var voteOne = new Vote({
    userId: 1,
    productId: 32,
    rating: 8
});

var voteTwo = new Vote({
    userId: 0,
    productId: 30,
    rating: 4
});

var voteThree = new Vote({
    userId: 0,
    productId: 15,
    rating: 9
});

var voteFour = new Vote({
    userId: 2,
    productId: 4,
    rating: 10
});


describe('Users', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      Vote.create(voteOne, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Vote.create(voteTwo, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Vote.create(voteThree, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Vote.create(voteFour, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

});