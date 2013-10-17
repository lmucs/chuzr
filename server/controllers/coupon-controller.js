Coupon = require('../models/coupon')

module.exports = function (app) {

  function pagination(req) {
    return {skip: +req.query.skip || 0, limit: +req.query.limit || 10}
  }

  app.get('/coupons', function (req, res) {
    search = {};
    if (req.query.issuer) {
      search['issuer'] = {'$regex': req.query.issuer, '$options': 'i'}
    }
    if (req.query.status === 'active') {
      var currentDate = new Date();
      search['expirationDate'] = {'$gte': currentDate}
    }
    if (req.query.status === 'expired') {
      var currentDate = new Date();
      search['expirationDate'] = {'$lt': currentDate}
    }
    console.log("Searching Coupons: %j", search)
    Coupon.find(search, null, pagination(req), function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
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
