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

var voteOne = new Vote({
  rating: 10
});
voteOne.save(function(err) {
  if (err) console.log(err);
});

var voteTwo = new Vote({
  rating: 11
});
voteTwo.save(function(err) {
  if (err) console.log(err);
});

var voteThree = new Vote({
  rating: 3
});
voteThree.save(function(err) {
  if (err) console.log(err);
});

var voteFour = new Vote({
  rating: 7
});
voteFour.save(function(err) {
  if (err) console.log(err);
});
