var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var couponSchema = new Schema({
	_id         	: ObjectId
  , issuer			: String
  , value			: String
  , promoCode		: String
  , expirationDate	: Date
  , imageURL		: String
});

var Coupon = mongoose.model('Coupon', couponSchema);