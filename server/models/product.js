var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var productSchema = new Schema({
    _id         : Schema.Types.ObjectId
  , name        : String
  , description : String
  , imageURL    : String
  , rating      : Number
  , categories  : [String]
  , price       : Number
  , related     : [String] //[]Schema.Types.ObjectId
});

var Product = mongoose.model('Product', productSchema);

// Clear old data
Product.remove({}, function(err) {
    if (err) {
        console.log ('error deleting old data.');
    }
});

var productOne = new Product({
    name : "Furby",
    description : "Creepy Toy",
    imageURL : "google.com",
    rating : 8,
    categories : [],
    price : 19.99,
    related : []
});
productOne.save(function(err) {
    if (err) console.log(err);
});


var productTwo = new Product({
      name : "Shake-Weight",
      description : "Suggestive workout machine",
      imageURL : "NSFW",
      rating : 10,
      categories : ["infomercial", "exercise"],
      price : 9.99,
      related : ["Sketchers ShapeUps"]
});
productTwo.save(function(err) {
      if (err) console.log(err);
});