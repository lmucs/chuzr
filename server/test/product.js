var utils = require('./utils');
var Product = require('../models/product');

var productOne = {
  name : "Furby",
  description : "Creepy Toy",
  imageURL : "google.com",
  rating : 8,
  categories : [],
  price : 19.99,
  related : []
};

var productTwo = {
  name : "Shake-Weight",
  description : "Suggestive workout machine",
  imageURL : "NSFW",
  rating : 10,
  categories : ["infomercial", "exercise"],
  price : 9.99,
  related : ["Sketchers ShapeUps"]
};

describe('Products', function () {

  describe('#save()', function () {
    it('should save without error', function (done) {
      Product.create(productOne, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

});
