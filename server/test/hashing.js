require('./utils');

var should = require('should');
var User = require('../models/user');
    
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
  hashedPassword: 'password'
};

describe('Password Hashing', function () {
  describe('#encrypt', function () {
    it('should create and hash without error', function (done) {
      User.create(userOne, function (err) {
        if (err) throw err;
        done();
      });
    });
    it('should accept the matching password and reject all others', function (done) {
      User.create(userOne, function (err, user) {
        should.not.exist(err);
        user.checkPassword('password', function (err, isMatch) {
          if (err) throw err;
          isMatch.should.be.true;
        });
        user.checkPassword('password12', function (err, isMatch) {
          if (err) throw err;
          isMatch.should.be.false;
        });
        done();
      });
    });
  });
});