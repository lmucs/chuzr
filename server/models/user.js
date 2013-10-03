var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
    name            : {
        first   : String
      , last    : { 
            type    : String
          , trim: true 
        }
    }
  , email           : String
  , login           : String
  , hashedPassword  : String
  , avatarURL       : String
  , reputation      : Number
  , socialHandle    : String
  , salt            : String
});

var User = mongoose.model('User', userSchema);

// Clear old data
User.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});


var lunaUser = new User({
    name: {
        first: "Luna",
        last: "Bar"
    },
    email: "lunabar@example.com",
    username: "lunaluna"
});
lunaUser.save(function (err) {
    if (err) console.log(err);
});

var clifUser = new User({
    name: {
        first: "Clif",
        last: "Bar"
    },
    email: "clifbar@example.com",
    username: "clifclif"
});

clifUser.save(function (err) {
    if (err) console.log(err);
});


var candyUser = new User({
    name: {
        first: "Candy",
        last: "Bar"
    },
    email: "candybar@example.com",
    username: "candycandy"
});
candyUser.save(function (err) {
    if (err) console.log(err);
});
