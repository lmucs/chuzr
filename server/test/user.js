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
  hashedPassword: 'qiyh4XPJGsOZ2MEAyLkfWqeQ'
};

var userTwo = {
  name: {
    first: 'Clif',
    last: 'Bar'
  },
  email: 'clifbar@example.com',
  login: 'clifclif'
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
  hashedPassword: 'aoeihg9984jh19we'
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
        user.hashedPassword.should.equal('qiyh4XPJGsOZ2MEAyLkfWqeQ')
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
      // Create the user.
      request(url).post('/users').send(userOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that user by id.
        request(url).get('/users/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(201);
          done();
        })
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/users').send(userOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/users').send(userOne).end(function (err, res) {
        if (err) throw err;
        res.body.name.first.should.equal('Luna')
        res.body.name.last.should.equal('Bar')
        res.body.email.should.equal('lunabar@example.com')
        res.body.login.should.equal('lunaluna')
        res.body.reputation.should.equal(1000)
        res.body.hashedPassword.should.equal('qiyh4XPJGsOZ2MEAyLkfWqeQ')
        res.body.avatarURL.should.equal('http://i.lunabar.com/luna.png')
        Object.keys(res.body).length.should.equal(9);
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the user.
      request(url).post('/users').send(userOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Delete that user.
        request(url).del('/users/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  }) 

  describe('#update()', function () {
    it('should update without error', function (done) {
      // Create the user.
      request(url).post('/users').send(userOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      //Ensure correct user posted
      request(url).get('/users').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body[0].name.first.should.equal('Luna')
        res.body[0].name.last.should.equal('Bar')
        res.body[0].email.should.equal('lunabar@example.com')
        res.body[0].login.should.equal('lunaluna')
        res.body[0].reputation.should.equal(1000)
        res.body[0].hashedPassword.should.equal('qiyh4XPJGsOZ2MEAyLkfWqeQ')
        res.body[0].avatarURL.should.equal('http://i.lunabar.com/luna.png')

        // Update that user.
        request(url).put('/users/' + res.body[0]._id).send(userThree).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          
          //Ensure user has new data
          request(url).get('/users').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200);
            res.body[0].name.first.should.equal('Candy')
            res.body[0].name.last.should.equal('Bar')
            res.body[0].email.should.equal('candybar@example.com')
            res.body[0].login.should.equal('candycandy')
            res.body[0].reputation.should.equal(15)
            res.body[0].hashedPassword.should.equal('aoeihg9984jh19we')
            res.body[0].avatarURL.should.equal('http://i.candybar.com/candy.png')
            done();
          })
        })
      })
    });
  });
});
