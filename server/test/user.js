var mongoose = require('mongoose');
var User = require('../models/user');

describe('Users', function(){

  describe('#save()', function(){
    it('should save without error', function(done){
      var user = new User({
        name: {
          first: "Luna",
          last: "Bar"
        },
        email: "lunabar@example.com",
        username: "lunaluna"
      });
      user.save(function (err) {
        if (err) throw err;
        done();
      });
    })
  })

});
