var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var couponSchema = new Schema({
  name: String,
  dateJoined: String
});

var Coupon = mongoose.model('Coupon', couponSchema);

// Clear old data
Coupon.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});
