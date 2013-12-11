require('./utils');

var should = require('should');
var request = require('supertest');  
var Vote = require('../models/vote');
var User = require('../models/user');
var VoteController = require('../controllers/vote-controller')
var request = require('supertest')
var url = require('../config/config').test.url;
var async = require('async');

var testData = [
  "1|32|numeric|8",
  "0|32|numeric|4",
  "0|15|numeric|9",
  "2|4|numeric|10",
  "1|2|numeric|3",
  "1|44|numeric|8",
  "12|9|numeric|10",
  "8|8|numeric|8",
  "123|456|numeric|7",
  "288|46|numeric|6",
  "65|789|numeric|1",
  "99|98|numeric|0",
  "99|98|numeric|2",
  "99|98|numeric|7.7",
  "99|43|numeric|89",
  "45|100|numeric|-5",
  "32|12344|numeric|2.65",
  "99|98|comparison|3",
  "54|432|trashType|4"
]

var testVotes = testData.map(function (s) {
  var v = s.split('|');
  return {userId: v[0], productId: v[1], ratingType: v[2], rating: +v[3]}
});

var admin = {
  name: {
    first: 'Addy',
    last: 'Ministrator'
  },
  email: 'admin@example.com',
  login: 'testUser',
  reputation: 9001,
  socialHandle: 'Admin',
  avatarURL: 'http://i.powertrip.com/iamadmin.jpg',
  hashedPassword: 'testPass',
  isAdmin: true
};

function insertVotes(votes, callback) {
  User.create(admin, function (err) {
    should.not.exist(err);
    var form = {email:admin.email, pass: 'testPass'}
    request(url).post('/sessions').type("form").send(form).end(function (err, res) {
      if (err) throw err;
      var cookies = res.headers['set-cookie'].pop().split(';')[0];
      var idsCreated = []
      if (votes.length === 0) return callback([], cookies);
      for (var i = 0; i < votes.length; i++) {
        req = request(url).post('/votes');
        req.cookies = cookies;
        req.send(votes[i]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(201);
          idsCreated.push(res.body._id)
          if (idsCreated.length === votes.length) return callback(idsCreated, cookies);
        });
      }
    });
  });
}

describe('Votes Model', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      Vote.create(testVotes[0], function (err) {
        if (err) throw err;
        done();
      })
    })
    it('should assign all properties on creation', function (done) {
      Vote.create(testVotes[0], function (err, vote) {
        should.not.exist(err);
        vote.userId.should.equal("1")
        vote.productId.should.equal("32")
        vote.rating.should.equal(8)
        done();
      })
    })
  })
});

describe('Votes Controller', function() {
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
      insertVotes([testVotes[0]], function (idsCreated, cookies) {
        request(url).get('/votes/' + idsCreated[0]).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
    
    it('should return a list of three votes', function (done) {
      insertVotes(testVotes.slice(0,3), function (idsCreated, cookies) {
        request(url).get('/votes').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200)
          res.body.length.should.equal(3);
          done();
        })
      }) 
    })
    
    it('should return two votes with productId = 32', function (done) {
      insertVotes(testVotes.slice(0,4), function (idsCreated, cookies) {
        request(url).get('/votes?productId=32').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200)
          res.body.length.should.equal(2);
          done();
        })
      });
    })
    
    it('should return two votes with userId = 0', function (done) {
      insertVotes(testVotes.slice(0,4), function (idsCreated, cookies) {
        request(url).get('/votes?userId=0').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200)
          res.body.length.should.equal(2);
          done();
        })
      })
    })

    it('should return one vote with userId = 0 and productId = 32', function (done) {
      insertVotes(testVotes.slice(0,4), function (idsCreated, cookies) {
        request(url).get('/votes?userId=0&productId=32').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200)
          res.body[0].userId.should.equal('0')
          res.body[0].productId.should.equal('32')
          res.body[0].rating.should.equal(4)
		      done();
        })
      });
    })

    it('should return a list of 10 votes, testing limit', function (done) {
      // Insert 11 votes but get endpoint returns 10 by default
      insertVotes(testVotes.slice(0,11), function (idsCreated, cookies) {
        request(url).get('/votes').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200)
          res.body.length.should.equal(10);
          done();
        })
      })
    })
    
    it('should return a list of 3 votes, testing limit', function (done) {
      insertVotes(testVotes.slice(0,5), function (idsCreated, cookies) {
        request(url).get('/votes?limit=3').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          res.body.length.should.equal(3);
          done();
        })
      })
    })

    it('should return a list of 10 votes starting with the 2nd vote in the db, testing skip and limit', function (done) {
      insertVotes(testVotes.slice(0,12), function (idsCreated, cookies) {
        request(url).get('/votes?skip=1').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          res.body.length.should.equal(10);
          done();
        })
      })
    })
    
    it('should return a list of 3 votes, testing skip and limit', function (done) {
      insertVotes(testVotes.slice(0,5), function (idsCreated, cookies) {
        request(url).get('/votes?skip=1&limit=3').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          res.body.length.should.equal(3);
          done();
        })
      })
    })
    
    it('should return a 404 when looking for a vote that doesn\'t exist', function (done) {
      insertVotes(testVotes.slice(0,1), function (idsCreated, cookies) {
        request(url).get('/votes/' + idsCreated[0] + "1").end(function (err, res) {
          if (err) throw err;
          res.should.have.status(404);
          done();
        })
      })
    })

    it('should use the active query parameter properly', function (done) {
      insertVotes(testVotes.slice(11,13), function (idsCreated, cookies) {
        request(url).get('/votes?userId=99&productId=98&active=false').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          res.body.length.should.equal(1);
          request(url).get('/votes?userId=99&productId=98&active=true').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body.length.should.equal(1);
            done();
          })
        })
      })
    })

    it('should return one vote with ratingType = "comparison"', function (done) {
      insertVotes(testVotes.slice(17,18), function () {
        request(url).get('/votes?ratingType=comparison').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  })

  describe('#create()', function () {

    it('should reject a rating higher than 10', function (done) {
      request(url).post('/votes').send(testVotes[14]).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      })
    })

    it('should reject a rating lower than 0', function (done) {
      insertVotes([testVotes[15]], function (idsCreated, cookies) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      })
    })

    it('should allow ratings that aren\'t a whole number', function (done) {
      insertVotes([testVotes[17]], function (idsCreated, cookies) {
        done();
      })
    })
    
    it('should reject a ratingType not in ["numeric", "comparison", "upDown"]', function (done) {
      insertVotes([testVotes[18]], function (idsCreated, cookies) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      })
    })
  })
});
