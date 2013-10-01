var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  email: String,
  username: String,
  hashedPassword: String,
  salt: String
});

var User = mongoose.model('User', userSchema);

// Clear old data
User.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});
