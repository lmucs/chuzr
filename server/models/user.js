var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    _id             : ObjectId
  , name            : {
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

module.exports = mongoose.model('User', userSchema);