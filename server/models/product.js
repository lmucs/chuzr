var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  description: String,
  imageURL: String,
  rating: Number,
  price: Number
});

var Product = mongoose.model('Product', productSchema);

// Clear old data
Product.remove({}, function(err) {
  if (err) {
    console.log ('error deleting old data.');
  }
});
