var Product = require('../models/product');
var auth = require('../utils/authentication');
var pagination = require('../utils/pagination');
var validator = require('../utils/validator');

module.exports = function (app) {

  app.get('/products', function (req, res) {
    search = {}
    if (req.query.name) {
      search['name'] = {'$regex': req.query.name, '$options': 'i'};
    }
    if (req.query.brand) {
      search['brand'] = {'$regex': req.query.brand, '$options': 'i'};
    }
    if (req.query.search) {
      search = {
        '$or': [
          {name: {'$regex': '^' + req.query.search, '$options': 'i'}},
          {brand: {'$in': [req.query.search]}}
        ]
      }
    }
    console.log("Searching Products: %j", search)
    Product.find(search, null, pagination(req), function (err, docs) {
      if (err) res.json(400, err);
      res.json(docs);
    });
  });

  app.post('/products', auth, function (req, res) {
    validator.mustBeAdmin(req, res, 'create a product');
    Product.create(req.body, function (err, product) {
      if (err) res.json(400, err);
      res.send(201, product);
    });
  });

  app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    Product.findById(id, function (err, product) {
      if (err) res.json(400, err);
      if (product === null) res.json(404, {'No such product': id});
      res.json(product);
    });
  });

  app.put('/products/:id', auth, function (req, res) {
    validator.mustBeAdmin(req, res, 'edit a product');
    var id = req.params.id;
    Product.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) res.json(400, err);
      res.json(200, {'Number updated': numUpdated});
    });
  });

  app.delete('/products/:id', auth, function (req, res) {
    validator.mustBeAdmin(req, res, 'delete a product');
    var id = req.params.id;
    Product.remove({_id: id}, function (err) {
      if (err) res.json(400, err);
      res.json(200, {Deleted: id});
    });
  });
}
