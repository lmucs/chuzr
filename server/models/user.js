var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , bcrypt = require('bcrypt-nodejs')
  , workFactor = 10;

var userSchema = new Schema({
    name            : {
        first   : String
      , last    : { 
            type    : String
          , trim: true 
        }
    }
  , email           : String
  , login           : {
          type: String
        , unique: true
    }
  , hashedPassword  : String
  , avatarURL       : String
  , reputation      : Number
  , socialHandle    : String
  , dateOfBirth     : Date
  , location        : {
            city    : String
          , state   : String
    }
  , friends         : [ObjectId]
  , isAdmin         : Boolean
});

// A pre hook to hash the password on save.
userSchema.pre('save', function (next) {
  var user = this;
  
  //don't bother hashing if no changes were made
  if (!user.isModified('hashedPassword')) return next();
  
  bcrypt.hash(user.hashedPassword, null, null, function(err, hash) {
    if (err) return next(err);
    user.hashedPassword = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (entry, callback) {
  bcrypt.compare(entry, this.hashedPassword, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
