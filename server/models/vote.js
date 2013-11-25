var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
    userId         : Number        //ObjectId (will use later once functional)
  , productId      : Number        //ObjectTd
  , ratingType     : String
  , rating         :
  {
      type: Number
    , min: 0
    , max: 10
  }
  , timestamp      : Date
  , active         : Boolean
});

module.exports = mongoose.model('Vote', voteSchema);
