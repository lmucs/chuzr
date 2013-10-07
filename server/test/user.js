require('./utils');

var should = require('should');
var User = require('../models/user');

var userOne = {
  name: {
    first: "Luna",
    last: "Bar"
  },
  email: "lunabar@example.com",
  login: "lunaluna",
  reputation: 1000,
  socialHandle: "lunabar",
  avatarURL: "http://i.lunabar.com/luna.png",
  hashedPassword: "qiyh4XPJGsOZ2MEAyLkfWqeQ"
};

var userTwo = {
  name: {
    first: "Clif",
    last: "Bar"
  },
  email: "clifbar@example.com",
  username: "clifclif"
};

var userThree = {
  name: {
    first: "Candy",
    last: "Bar"
  },
  email: "candybar@example.com",
  username: "candycandy"
};

describe('Users', function(){

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
        user.name.first.should.equal("Luna")
        user.name.last.should.equal("Bar")
        user.email.should.equal("lunabar@example.com")
        user.login.should.equal("lunaluna")
        user.reputation.should.equal(1000)
        user.hashedPassword.should.equal("qiyh4XPJGsOZ2MEAyLkfWqeQ")
        user.avatarURL.should.equal("http://i.lunabar.com/luna.png")
        done();
      })
    })
  })

});
