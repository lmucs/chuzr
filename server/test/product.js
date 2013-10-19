require('./utils');

var should = require('should');
var request = require('supertest');  
var Product = require('../models/product');
var url = require('../config/config').test.url;

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

describe('Products Model', function () {

  describe('#search()', function () {
    it('should return an empty list when no products', function (done) {
      Product.find({}, function (err, product) {
        should.not.exist(err);
        product.should.eql([]);
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Product.create(productOne, function (err) {
        should.not.exist(err);
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
        product.categories.join().should.equal("tablet,HD")
        product.related.join().should.equal("iPad,iPad Mini,Microsoft Surface")
        done();
      })
    })
  })

});

describe('Products Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no products', function (done) {
      request(url).get('/products').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    it('should get by id without error', function (done) {
      // Create the product.
      request(url).post('/products').send(productOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that product by id.
        request(url).get('/products/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
        })

        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/products').send(productOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/products').send(productOne).end(function (err, res) {
        if (err) throw err;
        res.body.name.should.equal("Kindle Fire HDX");
        res.body.description.should.equal("Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras");
        res.body.imageURL.should.equal("http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg");
        res.body.rating.should.equal(8);
        res.body.price.should.equal(379.99);
        res.body.categories.join().should.equal("tablet,HD");
        res.body.related.join().should.equal("iPad,iPad Mini,Microsoft Surface");
        Object.keys(res.body).length.should.equal(9);
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the product.
      request(url).post('/products').send(productOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Delete that product.
        request(url).del('/products/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
        })

        done();
      })
    })
  }) 


});
