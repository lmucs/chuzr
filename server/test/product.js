require('./utils');

var should = require('should');
var request = require('supertest');  
var Product = require('../models/product');
var url = require('../config/config').test.url;
var User = require('../models/user');

var testProducts = [
  {
    name : "Kindle Fire HDX",
    description : "Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras",
    url : "http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg",
    categoryId: 93,
    images : {fourHundred: 'url1', oneSixty: 'url2'},
    shopzillaId : 300,
    price : {min: 379.99, max: 700},
    related : [16, 22, 888]
  },
  {
    name : "Shake-Weight",
    description : "Suggestive workout machine",
    url : "NSFW",
    categoryId: 22,
    images : {fourHundred: 'url1', oneSixty: 'url2'},
    shopzillaId : 3123,
    price : {min: 9.95, max: 12.47},
    related : [3]
  }
];

var admin = {
  name: {
    first: 'Addy',
    last: 'Ministrator'
  },
  email: 'admin@example.com',
  login: 'testUser',
  reputation: 9001,
  socialHandle: 'Admin',
  avatarURL: 'http://i.powertrip.com/iamadmin.jpg',
  hashedPassword: 'testPass',
  isAdmin: true
};

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
  if (product.images) {
    ['fourHundred','oneSixty','oneHundred','sixty'].forEach(function (size) {
      if (product[size]) product.images[size].should.equal(other.images[size])
    })
  }
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
      User.create(admin, function (err) {
        if (err) throw err;
        request(url).post('/products').send(testProducts[0]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(201);
          res.should.be.json;

          // Get that product by id.
          request(url).get('/products/' + res.body._id).end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            res.should.be.json;
            done();
          });
        });
      })     
    });
  });

  describe('#create()', function () {
    it('should create without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
        request(url).post('/products').send(testProducts[0]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(201);
          done();
        })
      })   
    })
    it('should assign all properties on creation, including an _id', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
        request(url).post('/products').send(testProducts[0]).end(function (err, res) {
          should.not.exist(err);
          productsShouldBeSame(res.body, testProducts[0]);
          done();
        })
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
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
  });
  
  describe('#update()', function () {
    it('should update without error', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
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
      })
    });
  });
});
