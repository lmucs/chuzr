var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: ''},
  hashed_password: { type: String, default: '' }
});

var User = mongoose.model('User', userSchema);

// Clear out old data
User.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});

// Creating one user.
var johndoe = new User ({
  name: { first: 'John', last: '  Doe   ' },
  age: 25
});

// Saving it to the database.
johndoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var janedoe = new User ({
  name: { first: 'Jane', last: 'Doe' },
  age: 65
});
janedoe.save(function (err) {if (err) console.log ('Error on save!')});

// Creating more users manually
var alicesmith = new User ({
  name: { first: 'Alice', last: 'Smith' },
  age: 45
});
alicesmith.save(function (err) {if (err) console.log ('Error on save!')});
