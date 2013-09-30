Coupon = require('../models/coupon')

module.exports = function (app) {
  
  function validateCouponId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };

  app.get('/coupons', function (req, res) {
    var parameterFlag = false,
        coupons = [];
    if (req.query.issuer) {
      coupons.push.apply(coupons, Coupon.findByIssuer(req.query.issuer));
      parameterFlag = true;
    }
	
    //"coupons/?status=active" will show "valid" (not expired) coupons, "status=expired" will show expired coupons
	if (req.query.status) {
      coupons.push.apply(coupons, Coupon.findByStatus(req.query.status));
      parameterFlag = true;
    }
	
    if (!parameterFlag) {
      console.log("Status Code: ", res.statusCode);
      skip = +req.query.skip || 0;
      limit = +req.query.limit || 10;
      console.log('skip = %d, limit = %d', skip, limit);
      return res.json(Coupon.findAll(skip=skip, limit=limit));
    }
    return res.json(coupons);
  });

  app.get('/coupons/:id', function (req, res) {
    var id = validateCouponId(req.params.id);
    try {
        res.json(Coupon.findById(id));
    } catch (e) {
        if (e == Coupon.NO_SUCH_COUPON) {
            res.send(400, 'No such coupon');
        } else {
            throw e;
        }     
    }
  });
  
  app.post('/coupons', function (req, res) {
    var coupon = new Coupon();
    coupon.save(function (error) {
      return error ? res.send(error) : res.send("coupon added");
    });
  });


  
  // TODO get coupons by expiration date? Like if they're still valid or not

  app.put('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
    coupon = Coupon.findById(id);
    coupon.save(function (error) {
      return error ? res.send(error) : res.send("coupon updated");
    });
  });

  app.delete('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
    coupon = Coupon.findById(id);
    coupon.remove(function (error) {
      return error ? res.send(error) : res.send("coupon removed");
    });
  });
}
  
