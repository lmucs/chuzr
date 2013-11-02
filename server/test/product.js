require('./utils');

var should = require('should');
var request = require('supertest');  
var Product = require('../models/product');
var url = require('../config/config').test.url;

var productOne = {
  name : "Kindle Fire HDX",
  description : "Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras",
  url : "http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg",
  categoryId: 93,
  price : {min: 379.99, max: 700},
  related : [16, 22, 888]
};

var productTwo = {
  name : "Shake-Weight",
  description : "Suggestive workout machine",
  url : "NSFW",
  categoryId: 22,
  price : {min: 9.95, max: 12.47},
  related : [3]
};

/*
 * Asserts that two coupon representations are the same. The coupons can be either
 * (1) actual coupon model objects, (2) plain JavaScript objects with coupon properties,
 * or (3) JSON representations returned from the API.  Because coupons from mongo can
 * have extra properties like _id and _v, we only compare the basic coupon properties.
 */
function productsShouldBeSame(product, other) {
  product.name.should.equal(other.name);
  product.description.should.equal(other.description);
  product.url.should.equal(other.url);
  product.categoryId.should.eql(other.categoryId);
  product.price.min.should.eql(other.price.min);
  product.price.max.should.eql(other.price.max);
  product.related.join('').should.eql(other.related.join(''));
}

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
        productsShouldBeSame(product, productOne)
        done();
      })
    })
  })

});

describe('Products Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no products', function (done) {
      request(url).get('/products').end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    it('should get by id without error', function (done) {
      // Create the product.
      request(url).post('/products').send(productOne).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);

        // Get that product by id.
        request(url).get('/products/' + res.body._id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        })
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/products').send(productOne).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/products').send(productOne).end(function (err, res) {
        should.not.exist(err);
        productsShouldBeSame(res.body, productOne)
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the product.
      request(url).post('/products').send(productOne).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);

        // Delete that product.
        request(url).del('/products/' + res.body._id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        })
      })
    })
  })
  
  describe('#update()', function () {
    it('should update without error', function (done) {
      // Create the product.
      request(url).post('/products').send(productOne).end(function (err, res) {
       should.not.exist(err);
      
        //Update that product.
        var id = res.body._id;
        
        request(url).put('/products/' + id).send(productTwo).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
        
          //Ensure product has new data
          request(url).get('/products/' + id).end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            productsShouldBeSame(res.body, productTwo)
            done();
          })  
        })    
      })
    });
  });
});
