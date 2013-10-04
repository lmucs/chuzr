var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var voteSchema = new Schema({
    _id         : ObjectId
  , userId      : Number        //ObjectId (will use later once functional)
  , productId   : Number        //ObjectTd
  , rating      : Number
});

var Vote = mongoose.model('Vote', voteSchema);