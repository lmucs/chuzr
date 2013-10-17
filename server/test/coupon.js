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

describe('Coupon Model', function(){

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
        coupon.expirationDate.getTime().should.equal(1386316800000)  //TODO figure out how to test dates
        coupon.imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg")
        done();
      })
    })
  })

});

describe('Coupon Controller', function () {

  describe('#search', function () {
    it('should return an empty list when no coupons', function (done) {
      request(url).get('/coupons').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
		console.log(res.body);
        res.body.should.eql([]);
        done();
      })
    })
  })

  describe('#post', function () {
    it('should return 201 after post', function (done) {
      request(url).post('/coupons')
	  .set('Content-Type', 'application/json')
	  .send(couponTwo)
	  .end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
		console.log(res.body);
		done();
      })
    })