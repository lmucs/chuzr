require('./utils');

var Coupon = require('../models/coupon');

var couponOne = new Coupon{
  issuer: "target",
  value: "Free TV",
  promoCode: "XJSD32",
  expirationDate: new Date(2013, 11, 6),
  imageURL: "http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg"
};

var couponTwo = new Coupon{
  issuer: "amazon",
  value: "30% off Wii-U",
  promoCode: "EFHS79",
  expirationDate: new Date(2013, 9, 31),
  imageURL: "http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg"
};

var couponThree = new Coupon{
  issuer: "best_buy",
  value: "20% off Best Buy",
  promoCode: "AJGD51",
  expirationDate: new Date(2014, 0, 31),
  imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"
};

var couponFour = new Coupon{
  issuer: "lmu_bookstore",
  value: "Free Textbooks!",
  promoCode: "NEVR11",
  expirationDate: new Date(1980, 5, 6),
  imageURL: "http://www.universitybusiness.com/sites/default/files/styles/crop-tool-350x250/public/field/image/textboook.jpg?itok=i3kfC4uR"
};

describe('Coupons', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(couponOne, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(couponTwo, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(couponThree, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(couponFour, function (err) {
        if (err) throw err;
        done();
      })
    })
  })

});
