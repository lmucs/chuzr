Product = require('../models/product')

module.exports = function (app) {

  function pagination(req) {
    return {skip: +req.query.skip || 0, limit: +req.query.limit || 10}
  }

  app.get('/products', function (req, res) {
    search = {}
    if (req.query.name) {
      search['name'] = {'$regex': '^' + req.query.name, '$options': 'i'}
    }
    if (req.query.c) {
      search['categories'] = {'$in': [req.query.c]}
    }
    console.log("Searching Products: %j", search)
    Product.find(search, null, pagination(req), function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
  });

  app.post('/products', function (req, res) {
    Product.create(req.body, function (err, product) {
      if (err) res.json(400, err)
      res.send(201, product);
    });
  });

  app.get('/products/:id', function (req, res) {
    var id = req.params.id;
    Product.findById(id, null, function (err, doc) {
      if (err) res.json(400, err)
      if (doc === null) res.json(404, {"No such id": id})
      res.json(doc)
    });
  });

  app.put('/products/:id', function (req, res) {
    var id = req.params.id;
    console.log(req.body)
    Product.update({_id: id}, req.body, function (err, doc) {
      if (err) res.json(400, err)
      res.json(200, {Updated: doc});
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
