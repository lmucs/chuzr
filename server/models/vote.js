var mongoose = require('mongoose');

var voteSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  ratingType: String,
  rating: {
    type: Number,
    min: 0,
    max: 10
  },
  timestamp: Date,
  active: Boolean
});

module.exports = mongoose.model('Vote', voteSchema);
