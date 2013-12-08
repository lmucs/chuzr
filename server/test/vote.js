require('./utils');

var should = require('should');
var request = require('supertest');  
var Vote = require('../models/vote');
var VoteController = require('../controllers/vote-controller')
var request = require('supertest')
var url = require('../config/config').test.url;
var async = require('async');

var voteOne = {
  userId: 1,
  productId: "32",
  ratingType: "numeric",
  rating: 8
};

var voteTwo = {
  userId: 0,
  productId: "32",
  ratingType: "numeric",
  rating: 4
};

var voteThree = {
  userId: 0,
  productId: "15",
  ratingType: "numeric",
  rating: 9
};

var voteFour = {
  userId: 2,
  productId: "4",
  ratingType: "numeric",
  rating: 10
};

var voteFive = {
  userId: 1,
  productId: "2",
  ratingType: "numeric",
  rating: 3
};

var voteSix = {
  userId: 1,
  productId: "44",
  ratingType: "numeric",
  rating: 8
};

var voteSeven = {
  userId: 12,
  productId: "9",
  ratingType: "numeric",
  rating: 10
};

var voteEight = {
  userId: 8,
  productId: "8",
  ratingType: "numeric",
  rating: 8
};

var voteNine = {
  userId: 123,
  productId: "456",
  ratingType: "numeric",
  rating: 7
};

var voteTen = {
  userId: 288,
  productId: "46",
  ratingType: "numeric",
  rating: 6
};

var voteEleven = {
  userId: 65,
  productId: "789",
  ratingType: "numeric",
  rating: 1
};

var voteTwelve = {
  userId: 99,
  productId: "98",
  ratingType: "numeric",
  rating: 0
};

var voteThirteen = {
  userId: 99,
  productId: "98",
  ratingType: "numeric",
  rating: 2
};

var voteFourteen = {
  userId: 99,
  productId: "98",
  ratingType: "numeric",
  rating: 7.7
};

var voteFifteen = {
  userId: 99,
  productId: "43",
  ratingType: "numeric",
  rating: 89
};

var voteSixteen = {
  userId: 45,
  productId: "100",
  ratingType: "numeric",
  rating: -5
};

var voteSeventeen = {
  userId: 32,
  productId: "12344",
  ratingType: "numeric",
  rating: 2.65
};

var voteEighteen = {
  userId: 99,
  productId: "98",
  ratingType: "comparison",
  rating: 3
};

var voteNineteen = {
  userId: 54,
  productId: "432",
  ratingType: "trashType",
  rating: 4
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
        vote.productId.should.equal("32")
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
      async.series([
        function(){
          // Create 3 votes.
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Get the votes.
          request(url).get('/votes').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200)
            res.body.length.should.equal(3);
            done();
          })
        }
      ]);
    })
    
    it('should return two votes with productId = 32', function (done) {
      // Create 4 votes.
      async.series([
        function(){
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){  
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){  
          // Get the votes.
          request(url).get('/votes?productId=32').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200)
            res.body.length.should.equal(2);
            done();
          })
        }
      ]);
    })
    
    it('should return two votes with userId = 0', function (done) {
      async.series([
        function(){
          // Create 4 votes.
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Get the votes.
          request(url).get('/votes?userId=0').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200)
            res.body.length.should.equal(2);
            done();
          })
        }
      ]);
    })

    it('should return one vote with userId = 0 and productId = 32', function (done) {
      async.series([
        function(){
          // Create 4 votes.
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Get the votes.
          request(url).get('/votes?userId=0&productId=32').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200)
            res.body[0].userId.should.equal(0)
            res.body[0].productId.should.equal(32)
            res.body[0].rating.should.equal(4)
		    done();
          })
        }
      ]);
    })

    it('should return a list of 10 votes, testing limit', function (done) {
      async.series([
        function(){
          // Create 11 votes
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFive).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteSix).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteSeven).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteEight).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteNine).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTen).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteEleven).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Get the first 10 votes.
          request(url).get('/votes').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200)
            res.body.length.should.equal(10);
            done();
          })
        }
      ]);
    })
    
    it('should return a list of 3 votes, testing limit', function (done) {
      async.series([
        function(){
          // Create 4 votes
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Get the first 3 votes.
          request(url).get('/votes?limit=3').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(3);
            done();
          })
        }
      ]);
    })

    it('should return a list of 10 votes starting with the 2nd vote in the db, testing skip and limit',
      function (done) {
      async.series([
        function(){
          // Create 12 votes
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFive).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteSix).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteSeven).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteEight).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteNine).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTen).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteEleven).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwelve).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Get 10 votes starting with the second one in the db.
          request(url).get('/votes?skip=1').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(10);
            done();
          })
        }
      ]);
    })
    
    it('should return a list of 3 votes, testing skip and limit', function (done) {
      async.series([
        function(){
          // Create 5 votes
          request(url).post('/votes').send(voteOne).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteTwo).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThree).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFour).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteFive).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){          
          // Get 3 votes starting with the second one in the db.
          request(url).get('/votes?skip=1&limit=3').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(3);
            done();
          })
        }
      ]);
    })
    
    it('should return a 404 when looking for a vote that doesn\'t exist', function (done) {
      // Create the vote.
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Attempt to get the vote with a non-existent id.
        request(url).get('/votes/' + res.body._id + "1").end(function (err, res) {
          if (err) throw err;
          res.should.have.status(404);
          done();
        })
      })
    })

    it('should return three votes, two with active = false and one with active = true', function (done) {
      // Create two votes.
      async.series([
        function(){
          request(url).post('/votes').send(voteTwelve).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          request(url).post('/votes').send(voteThirteen).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){          
          // Get the inactive vote
          request(url).get('/votes?userId=99&productId=98&active=false').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(1);
            done();
          })
        },
        function (){
          // Get the active vote
          request(url).get('/votes?userId=99&productId=98&active=true').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(1);
            done();
          })
        },
        function(){
          // Create a third vote for this product and user
          request(url).post('/votes').send(voteFourteen).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          // Create a fourth vote for this product and user, but with a different ratingType
          request(url).post('/votes').send(voteEighteen).end(function (err, res) {
            if (err) throw err;
            res.should.have.status(201);
            done();
          })
        },
        function(){
          //Get the two inactive votes
          request(url).get('/votes?userId=99&productId=98&active=false').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(2);
          })
        },
        function(){
          //Get the two active votes
          request(url).get('/votes?userId=99&productId=98&active=true').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(2);
          })
        }
      ]);
    })

    it('should return one vote with ratingType = "comparison"', function (done) {
      // Create the vote.
      request(url).post('/votes').send(voteEighteen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Search for the vote.
        request(url).get('/votes?ratingType=comparison').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
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
        res.body.productId.should.equal("32");
        res.body.rating.should.equal(8);
        res.body.active.should.equal(true);
        Object.keys(res.body).length.should.equal(8);
        done();
      })
    })

    it('should reject a rating higher than 10', function (done) {
      request(url).post('/votes').send(voteFifteen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      })
    })

    it('should reject a rating lower than 0', function (done) {
      request(url).post('/votes').send(voteSixteen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      })
    })

    it('should allow ratings that aren\'t a whole number', function (done) {
      request(url).post('/votes').send(voteSeventeen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    
    it('should reject a ratingType not in ["numeric", "comparison", "upDown"]', function (done) {
      request(url).post('/votes').send(voteNineteen).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      })
    })
  })
});
