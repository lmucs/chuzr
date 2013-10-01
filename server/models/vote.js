var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var voteSchema = new Schema({
  rating: Number
});

var Vote = mongoose.model('Vote', voteSchema);

// Clear old data
Vote.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});
