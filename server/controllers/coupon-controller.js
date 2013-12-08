var Coupon = require('../models/coupon');
var pagination = require('../utils/pagination');

module.exports = function (app) {

  app.get('/coupons', function (req, res) {
    search = {};
    if (req.query.issuer) {
      search['issuer'] = {'$regex': req.query.issuer, '$options': 'i'};
    }
    if (req.query.status === 'active') {
      search['expirationDate'] = {'$gte': new Date()};
    }
    if (req.query.status === 'expired') {
      search['expirationDate'] = {'$lt': new Date()};
    }
    console.log("Searching Coupons: %j", search);
    Coupon.find(search, null, pagination(req), function (err, docs) {
      if (err) return res.json(500, err);
      res.json(docs);
    });
  });
  
  app.post('/coupons', auth.adminRequire(function (req, res) {
    // TODO Admin auth
    Coupon.create(req.body, function (err, coupon) {
      if (err) return res.json(400, err);
      res.send(201, coupon);
    });
  }));

  app.get('/coupons/:id', function (req, res) {
    var id = req.params.id;
    Coupon.findById(id, function (err, coupon) {
      if (err) return res.json(400, err);
      if (!coupon) return res.json(404, {'No such coupon': id});
      res.json(coupon);
    });
  });

  app.put('/coupons/:id', auth.adminRequired( function (req, res) {
    // TODO Admin Auth
    var id = req.params.id;
    Coupon.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) return res.json(400, err);
      res.json(200, {'Number updated': numUpdated});
    });
  }));

  app.delete('/coupons/:id', auth.adminRequired( function (req, res) {
    // TODO Admin auth
    var id = req.params.id;
    Coupon.remove({_id: id}, function (err) {
      if (err) return res.json(400, err);
      res.json(200, {Deleted: id});
    });
  }));
}
