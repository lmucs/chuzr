require('./utils');

var should = require('should');
var request = require('supertest');  
var Product = require('../models/product');
var url = require('../config/config').test.url;

var testProducts = [
  {
    name : "Kindle Fire HDX",
    description : "Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras",
    url : "http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg",
    categoryId: 93,
    images : ["http://placehold.it/400x400", "http://placehold.it/200x200"],
    shopzillaId : 300,
    price : {min: 379.99, max: 700},
    related : [16, 22, 888]
  },
  {
    name : "Shake-Weight",
    description : "Suggestive workout machine",
    url : "NSFW",
    categoryId: 22,
    images : ["http://placehold.it/350x350"],
    categoryId: 85,
    shopzillaId : 3123,
    price : {min: 9.95, max: 12.47},
    related : [3]
  }
];

/*
 * Asserts that two product representations are the same. The products can be either
 * (1) actual product model objects, (2) plain JavaScript objects with product properties,
 * or (3) JSON representations returned from the API.  Because products from mongo can
 * have extra properties like _id and _v, we only compare the basic product properties.
 */
function productsShouldBeSame(product, other) {
  product.name.should.equal(other.name);
  product.description.should.equal(other.description);
  product.url.should.equal(other.url);
  product.categoryId.should.eql(other.categoryId);
  product.shopzillaId.should.eql(other.shopzillaId);
  product.images.join('').should.eql(other.images.join(''));
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
      });
    });
  });

  describe('#create()', function () {
    it('should create without error', function (done) {
      Product.create(testProducts[0], function (err) {
        should.not.exist(err);
        done();
      });
    });
    it('should assign all properties on creation', function (done) {
      Product.create(testProducts[0], function (err, product) {
        should.not.exist(err);
        productsShouldBeSame(product, testProducts[0]);
        done();
      });
    });
  });

});

describe('Products Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no products', function (done) {
      request(url).get('/products').end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      });
    });
  });  

  describe('#retrieve()', function () {
    it('should get by id correctly', function (done) {
      // Create the coupon.
      request(url).post('/products').send(testProducts[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        res.should.be.json;

        // Get that coupon by id.
        request(url).get('/products/' + res.body._id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
      });
    });
  });

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/products').send(testProducts[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/products').send(testProducts[0]).end(function (err, res) {
        should.not.exist(err);
        productsShouldBeSame(res.body, testProducts[0]);
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the product.
      request(url).post('/products').send(testProducts[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        var id = res.body._id;

        // Delete that product.
        request(url).del('/products/' + id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);

          // It should be deleted
          request(url).get('/products/' + id).end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(404);
            done();
          });
        });
      });
    });
  });
  
  describe('#update()', function () {
    it('should update without error', function (done) {
      // Create the product.
      request(url).post('/products').send(testProducts[0]).end(function (err, res) {
       should.not.exist(err);
      
        //Update that product.
        var id = res.body._id;
        
        request(url).put('/products/' + id).send(testProducts[1]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
        
          //Ensure product has new data
          request(url).get('/products/' + id).end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            productsShouldBeSame(res.body, testProducts[1]);
            done();
          });  
        });    
      });
    });
  });
});
