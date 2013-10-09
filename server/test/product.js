require('./utils');

var should = require('should');
var Product = require('../models/product');

var productOne = {
  name : "Kindle Fire HDX",
  description : "Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras",
  imageURL : "http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg",
  rating : 8,
  categories : ["tablet", "HD"],
  price : 379.99,
  related : ["iPad", "iPad Mini", "Microsoft Surface"]
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

  describe('#create()', function () {
    it('should create without error', function (done) {
      Product.create(productOne, function (err) {
        if (err) throw err;
        done();
      })
    })
    it('should assign all properties on creation', function (done) {
      Product.create(productOne, function (err, product) {
        should.not.exist(err);
        product.name.should.equal("Kindle Fire HDX")
        product.description.should.equal("Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras")
        product.imageURL.should.equal("http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg")
        product.rating.should.equal(8)
        product.price.should.equal(379.99)

        //These must be fixed, I simply stringify the arrays and match them
        product.categories.join().should.equal("tablet,HD")
        product.related.join().should.equal("iPad,iPad Mini,Microsoft Surface")
        done();
      })
    })
  })

});
