require('./utils');

var should = require('should');
var request = require('supertest');  
var Vote = require('../models/vote');
var VoteController = require('../controllers/vote-controller')
var request = require('supertest')
var url = require('../config/config').test.url;

var voteOne = {
  userId: 1,
  productId: 32,
  rating: 8
};

var voteTwo = {
  userId: 0,
  productId: 32,
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

var voteFive = {
  userId: 1,
  productId: 2,
  rating: 3
};

var voteSix = {
  userId: 1,
  productId: 44,
  rating: 8
};

var voteSeven = {
  userId: 12,
  productId: 9,
  rating: 10
};

var voteEight = {
  userId: 8,
  productId: 8,
  rating: 8
};

var voteNine = {
  userId: 123,
  productId: 456,
  rating: 7
};

var voteTen = {
  userId: 288,
  productId: 46,
  rating: 6
};

var voteEleven = {
  userId: 65,
  productId: 789,
  rating: 1
};

var voteTwelve = {
  userId: 99,
  productId: 98,
  rating: 0
}

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

describe('Votes Controller', function(){
  
    describe('#search()', function () {
    it('should return an empty list when no votes have been created', function (done) {
      request(url).get('/votes').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    it('should get by id without error', function (done) {
      // Create the vote.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that vote by id.
        request(url).get('/votes/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
    it('should return a list of three votes', function (done) {
      // Create 3 votes.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      // Get the votes.
      request(url).get('/votes').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200)
        res.body[0].userId.should.equal(1)
        res.body[0].productId.should.equal(32)
        res.body[0].rating.should.equal(8)
        res.body[1].userId.should.equal(0)
        res.body[1].productId.should.equal(32)
        res.body[1].rating.should.equal(4)
        res.body[2].userId.should.equal(0)
        res.body[2].productId.should.equal(15)
        res.body[2].rating.should.equal(9)
        res.body.length.should.equal(3);
        done();
      })
    })
    
    it('should return two votes with productId = 32', function (done) {
      // Create 4 votes.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      // Get the votes.
      request(url).get('/votes?productId=32').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200)
        res.body[0].userId.should.equal(1)
        res.body[0].productId.should.equal(32)
        res.body[0].rating.should.equal(8)
        res.body[1].userId.should.equal(0)
        res.body[1].productId.should.equal(32)
        res.body[1].rating.should.equal(4)
        res.body.length.should.equal(2);
        done();
      })
    })
    
    it('should return two votes with userId = 0', function (done) {
      // Create 4 votes.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      // Get the votes.
      request(url).get('/votes?userId=0').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200)
        res.body[0].userId.should.equal(0)
        res.body[0].productId.should.equal(32)
        res.body[0].rating.should.equal(4)
        res.body[1].userId.should.equal(0)
        res.body[1].productId.should.equal(15)
        res.body[1].rating.should.equal(9)
        res.body.length.should.equal(2);
        done();
      })
    })
    
    it('should return one vote with userId = 0 and productId = 32', function (done) {
      // Create 4 votes.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      // Get the votes.
      request(url).get('/votes?userId=0&productId=32').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200)
        res.body[0].userId.should.equal(0)
        res.body[0].productId.should.equal(32)
        res.body[0].rating.should.equal(4)
		done();
      })
  })

    it('should return a list of 10 votes, testing limit', function (done) {
      // Create 11 votes
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFive).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteSix).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteSeven).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteEight).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteNine).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteEleven).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      // Get the first 10 votes.
      request(url).get('/votes').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200)
        res.body.length.should.equal(10);
        done();
      })
    })
    
    it('should return a list of 3 votes, testing limit', function (done) {
      // Create 4 votes
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      // Get the first 3 votes.
      request(url).get('/votes?limit=3').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body[0].userId.should.eql(1);
        res.body[0].productId.should.eql(32);
        res.body[0].rating.should.eql(8);
        res.body[1].userId.should.eql(0);
        res.body[1].productId.should.eql(32);
        res.body[1].rating.should.eql(4);
        res.body[2].userId.should.eql(0);
        res.body[2].productId.should.eql(15);
        res.body[2].rating.should.eql(9);
        res.body.length.should.equal(3);
        done();
      })
    })

    it('should return a list of 10 votes starting with the 2nd vote in the db, testing skip and limit',
      function (done) {
      // Create 12 votes
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFive).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteSix).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteSeven).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteEight).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteNine).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteEleven).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwelve).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      // Get 10 votes starting with the second one in the db.
      request(url).get('/votes?skip=1').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body[0].userId.should.eql(0);
        res.body[0].productId.should.eql(32);
        res.body[0].rating.should.eql(4);
        res.body[9].userId.should.eql(65);
        res.body[9].productId.should.eql(789);
        res.body[9].rating.should.eql(1);
        res.body.length.should.equal(10);
        done();
      })
    })
    
    it('should return a list of 3 votes, testing skip and limit', function (done) {
      // Create 5 votes
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })

      request(url).post('/votes').send(voteFive).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      // Get 3 votes starting with the second one in the db.
      request(url).get('/votes?skip=1&limit=3').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body[0].userId.should.eql(0);
        res.body[0].productId.should.eql(32);
        res.body[0].rating.should.eql(4);
        res.body[1].userId.should.eql(0);
        res.body[1].productId.should.eql(15);
        res.body[1].rating.should.eql(9);
        res.body[2].userId.should.eql(2);
        res.body[2].productId.should.eql(4);
        res.body[2].rating.should.eql(10);
        res.body.length.should.equal(3);
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
        res.body.userId.should.equal(1);
        res.body.productId.should.equal(32);
        res.body.rating.should.equal(8);
        Object.keys(res.body).length.should.equal(5);
        done();
      })
    })
  })
});
