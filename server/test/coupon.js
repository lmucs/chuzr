require('./utils');

var should = require('should');
var request = require('supertest');  
var Coupon = require('../models/coupon');
var url = require('../config/config').test.url;


var couponOne = {
  issuer: "target",
  value: "Free TV",
  promoCode: "XJSD32",
  expirationDate: new Date(2013, 11, 6),
  imageURL: "http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg"
};

var couponTwo = {
  issuer: "amazon",
  value: "30% off Wii-U",
  promoCode: "EFHS79",
  expirationDate: new Date(2013, 9, 31),
  imageURL: "http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg"
};

var couponThree = {
  issuer: "best_buy",
  value: "20% off Best Buy",
  promoCode: "AJGD51",
  expirationDate: new Date(2014, 0, 31),
  imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"
};

var couponFour = {
  issuer: "lmu_bookstore",
  value: "Free Textbooks!",
  promoCode: "NEVR11",
  expirationDate: new Date(1980, 5, 6),
  imageURL: "http://www.universitybusiness.com/sites/default/files/styles/crop-tool-350x250/public/field/image/textboook.jpg?itok=i3kfC4uR"
};

describe('Coupons Model', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(couponOne, function (err) {
        if (err) throw err;
        done();
      })
    })
    it('should assign all properties on creation', function (done) {
      Coupon.create(couponOne, function (err, coupon) {
        should.not.exist(err);
        coupon.issuer.should.equal("target")
        coupon.value.should.equal("Free TV")
        coupon.promoCode.should.equal("XJSD32")
        coupon.expirationDate.getTime().should.equal(1386316800000)
        coupon.imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg")
        done();
      })
    })
  })

});

describe.skip('Coupons Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no coupons', function (done) {
      request(url).get('/coupons').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    it('should get by id without error', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that coupon by id.
        request(url).get('/coupons/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
        })

        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.body.issuer.should.equal("target")
        res.body.value.should.equal("Free TV")
        res.body.promoCode.should.equal("XJSD32")
        res.body.expirationDate.should.equal("2013-12-06T08:00:00.000Z")
        res.body.imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg")
        Object.keys(res.body).length.should.equal(7);
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Delete that coupon.
        request(url).del('/coupons/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
        })

        done();
      })
    })
  }) 

});