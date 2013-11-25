require('./utils');

var should = require('should');
var request = require('supertest');  
var User = require('../models/user');
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
  hashedPassword: 'm00n',
  isAdmin: false
};

var userTwo = {
  name: {
    first: 'Clif',
    last: 'Bar'
  },
  email: 'clifbar@example.com',
  login: 'clifclif',
  hashedPassword: 'cl1f',
  isAdmin: false
};

var userThree = {
  name: {
    first: 'Candy',
    last: 'Bar'
  },
  email: 'candybar@example.com',
  login: 'candycandy',
  reputation: 15,
  socialHandle: 'candybar',
  avatarURL: 'http://i.candybar.com/candy.png',
  hashedPassword: 'w0nk4',
  isAdmin: false
};

var dupe = {
  name: {
    first: 'Dupli',
    last: 'Cate'
  },
  email: 'unoriginal@gmail.com',
  login: 'lunaluna',
  reputation: 0,
  socialHandle: 'copycat',
  avatarURL: 'http://i.generic.com/copy.png',
  hashedPassword: 'copied',
  isAdmin: false
};

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

describe('Users Model', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      User.create(userOne, function (err) {
        if (err) throw err;
        done();
      })
    })
    it('should assign all properties on creation', function (done) {
      User.create(userOne, function (err, user) {
        should.not.exist(err);
        user.name.first.should.equal('Luna')
        user.name.last.should.equal('Bar')
        user.email.should.equal('lunabar@example.com')
        user.login.should.equal('lunaluna')
        user.reputation.should.equal(1000)
        user.checkPassword('m00n', function (err, isMatch) {
          if (err) throw err;
          isMatch.should.be.true;
        });
        user.avatarURL.should.equal('http://i.lunabar.com/luna.png')
        done();
      })
    })
  })

});

describe('Users Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no users', function (done) {
      request(url).get('/users').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    it('should get by id without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      // Create the user.
      request(url).post('/users').send(userOne).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that user by id.
        request(url).get('/users/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/users').send(userOne).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/users').send(userOne).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        res.body.name.first.should.equal('Luna')
        res.body.name.last.should.equal('Bar')
        res.body.email.should.equal('lunabar@example.com')
        res.body.login.should.equal('lunaluna')
        res.body.reputation.should.equal(1000)
        /*res.body.checkPassword('w0nk4', function (err, isMatch) {
          if (err) throw err;
          isMatch.should.be.true;
        });*/
        res.body.avatarURL.should.equal('http://i.lunabar.com/luna.png')
        //Object.keys(res.body).length.should.equal(9);
        done();
      })
    })
    it('should error if trying to create a user with a login that already exists', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      });
      request(url).post('/users').send(userOne).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).post('/users').send(dupe).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        res.should.have.status(400);
        done();
      });
    });
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      // Create the user.
      request(url).post('/users').send(userOne).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Delete that user.
        request(url).del('/users/' + res.body._id).auth("testUser", "testPass").end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  }) 

  describe('#update()', function () {
    it('should update without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      // Create the user.
      request(url).post('/users').send(userOne).auth("testUser", "testPass").end(function (err, res) {
        if (err) throw err;
        
        //Update that user.
        var id=res.body._id;
        
        request(url).put('/users/' + id).send(userThree).auth("testUser", "testPass").end(function (err, res2) {
          if (err) throw err;
          res2.should.have.status(200);
        
          //Ensure user has new data
          request(url).get('/users/' + id).end(function (err, response) {
            if (err) throw err;
            response.should.have.status(200);
            response.body.name.first.should.equal('Candy')
            response.body.name.last.should.equal('Bar')
            response.body.email.should.equal('candybar@example.com')
            response.body.login.should.equal('candycandy')
            response.body.reputation.should.equal(15)
            /*user.checkPassword('w0nk4', function (err, isMatch) {
              if (err) throw err;
              isMatch.should.be.true;
            });*/
            response.body.avatarURL.should.equal('http://i.candybar.com/candy.png')
            done();
          })  
        })    
      })
    });
  });
});



