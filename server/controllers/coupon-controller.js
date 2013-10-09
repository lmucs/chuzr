Coupon = require('../models/coupon')

module.exports = function (app) {
  
  function validateCouponId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };

  app.get('/coupons', function (req, res) {
    Coupon.find(function (err, coupons) {
      if (!err) {
        return res.send(coupons);
      } else {
        return console.log(err);
      }
    });
  });
  
  app.get('/coupons/:id', function (req, res) {
    return Coupon.findById(req.params.id, function (err, coupons) {
      if (!err) {
        return res.send(coupons);
    }
      else {
        return res.send(404, 'No Such Coupon');
      }
    });
  });
  
  app.post('/coupons', function (req, res) {
    var coupon = new Coupon({
      issuer: req.body.issuer,
      value: req.body.value,
      promoCode: req.body.promoCode,
      expirationDate: req.body.expirationDate,
      imageURL: req.body.imageURL
    });
    coupon.save(function (err) {
      if (!err) {
        return console.log('Coupon Added');
      } else {
        return console.log(err);
      }
    });
    return res.send(coupon);
  });
}
