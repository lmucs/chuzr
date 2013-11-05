Product = require('../models/product')

module.exports = function (app) {

  function pagination(req) {
    return {skip: +req.query.skip || 0, limit: +req.query.limit || 10}
  }

  app.get('/products', function (req, res) {
    search = {}
    if (req.query.search) {
      search = {
        '$or': [
          {name: {'$regex': '^' + req.query.search, '$options': 'i'}},
          {categories: {'$in': [req.query.search]}}
        ]
      }
    }
    console.log("Searching Products: %j", search)
    Product.find(search, null, pagination(req), function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
  });

  app.post('/products', function (req, res) {
    Product.create(req.body, function (err, product) {
      if (err) res.json(400, err);
      res.send(201, product);
    });
  });

  app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    Product.findById(id, null, function (err, product) {
      if (err) res.json(400, err)
      if (product === null) res.json(404, {"No such id": id})
      res.json(product)
    });
  });

  app.put('/products/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body)
    Product.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) res.json(400, err)
      res.json(200, {Updated: numUpdated});
    });
  });

  app.delete('/products/:id', function (req, res) {
    var id = req.params.id;
    Product.remove({_id: id}, function (err) {
      if (err) res.json(400, err)
      res.json(200, {Deleted: id});
    });
  });
}
