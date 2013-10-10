Coupon = require('../models/coupon')

module.exports = function (app) {
  
  app.get('/coupons', function (req, res) {
    skip = +req.query.skip || 0;
    limit = +req.query.limit || 10;
	Coupon.find( { 'issuer': req.query.issuer }, {skip: skip, limit: limit}, function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
	}
    // TODO: Support query parameters!
    else {
	  Coupon.find({}, null, {skip: skip, limit: limit}, function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
	}
  });
  
  app.post('/coupons', function (req, res) {
    Coupon.create(req.body, function (err) {
      if (err) res.json(400, err)
      res.send(201);
    });
  });

  app.get('/coupons/:id', function (req, res) {
    var id = req.params.id;
    Coupon.findById(id, null, function (err, doc) {
      if (err) res.json(400, err)
      if (doc === null) res.json(404)
      res.json(doc)
    });
  });

  app.put('/coupons/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body)
    Coupon.update({_id: id}, req.body, function (err, doc) {
      if (err) res.json(400, err)
      res.json(200, {Updated: doc});
    });
  });

  app.delete('/coupons/:id', function (req, res) {
    var id = req.params.id;
    Coupon.remove({_id: id}, function (err) {
      if (err) res.json(400, err)
      res.json(200, {Deleted: id});
    });
  });
}
