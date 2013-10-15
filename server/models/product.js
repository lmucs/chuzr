var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    name        : String
  , description : String
  , imageURL    : String
  , rating      : Number
  , categories  : [String]
  , price       : Number
  , related     : [String]    // [ObjectId] for later functionality
});

module.exports = mongoose.model('Product', productSchema);