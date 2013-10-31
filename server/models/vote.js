var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
    userId      : Number        //ObjectId (will use later once functional)
  , productId   : Number        //ObjectTd
  , rating      :
  {
      type: Number
    , min: 0
    , max: 10
  }
});

module.exports = mongoose.model('Vote', voteSchema);
