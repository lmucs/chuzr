Coupon = require('../models/coupon')

module.exports = function (app) {
  
  function validateCouponId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };

  /** Gets all coupons **/
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
  
  /** Creates a coupon **/
  app.post('/coupons', function (req, res) {
	var coupon = new Coupon(req.body)//{
	res.send(201, coupon);
  });

  /** Updates a coupon **/
  app.put('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
	var newData = req.body;
	try {
	  coupon = Coupon.findById(id);
	} catch(e) {
	  res.send(400, "can't update a nonexisting coupon");
	}
	Coupon.update(coupon, newData);
	res.send(200);
  });

  app.delete('/coupons/:id', function (req, res) {
    id = validateCouponId(req.params.id);
    coupon = Coupon.findById(id);
    Coupon.delete(id);
    res.send("Coupon Deleted");
    /*
    coupon.remove(function (error) {
      return error ? res.send(error) : res.send("coupon removed");
    });
    */
  });
}
  
