var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var voteSchema = new Schema({
    userId: Number          //Schema.Types.ObjectId (will use later once functional)
  , productId: Number       //Schema.Types.ObjectTd
  , rating: Number
});

var Vote = mongoose.model('Vote', voteSchema);

// Clear old data
Vote.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});

var voteOne = new Vote({
    userId: 1,
    productId: 32,
    rating: 8
});
voteOne.save(function(err) {
      if (err) console.log(err);
});


var voteTwo = new Vote({
    userId: 0,
    productId: 30,
    rating: 4
});
voteTwo.save(function(err) {
    if (err) console.log(err);
});


var voteThree = new Vote({
    userId: 0,
    productId: 15,
    rating: 9
});
voteThree.save(function(err) {
    if (err) console.log(err);
});


var voteFour = new Vote({
    userId: 2,
    productId: 4,
    rating: 10
});
voteFour.save(function(err) {
    if (err) console.log(err);
});
