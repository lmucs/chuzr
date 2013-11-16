var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

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
  , dateOfBirth     : Date
  , location        : {
            city    : String
          , state   : String
    }
  , friends         : [ObjectId]
});

module.exports = mongoose.model('User', userSchema);
