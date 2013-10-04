require('./utils');

var User = require('../models/user');

var lunaUser = {
  name: {
    first: "Luna",
    last: "Bar"
  },
  email: "lunabar@example.com",
  username: "lunaluna"
};

var clifUser = {
  name: {
    first: "Clif",
    last: "Bar"
  },
  email: "clifbar@example.com",
  username: "clifclif"
};

var candyUser = {
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
      User.create(lunaUser, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

});
