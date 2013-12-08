var mongoose = require('mongoose');

var couponSchema = new mongoose.Schema({
  issuer: String,
  value: String,
  promoCode: String,
  expirationDate: Date,
  imageURL: String
});

module.exports = mongoose.model('Coupon', couponSchema);
