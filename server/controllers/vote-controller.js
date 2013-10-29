Vote = require('../models/vote')
auth = require('../authentication/auth-controller').auth

module.exports = function (app) {

  function pagination(req) {
    return {skip: +req.query.skip || 0, limit: +req.query.limit || 10}
  }

  // Get all the votes or get votes by userId and/or productId
  app.get('/votes', function (req, res) {
    var search = {};

    if (req.query.userId) {
      search["userId"] = req.query.userId;
    }
    if (req.query.productId) {
      search["productId"] = req.query.productId;
    }
    Vote.find(search, null, pagination(req), function (err, votes) {
      if (err) res.json(500, err);
      res.json(200, votes);
    });

  });

  app.post('/votes', auth, function (req, res) {
    Vote.create(req.body, function (err, vote) {
      if (err) res.send(400, err);
      res.send(201, vote);
    })
  });

  // Get a vote by its id
  app.get('/votes/:id', function (req, res) {
    var id = req.params.id;
      
    Vote.findById(id, null, function (err, vote) {
      if (err) res.json(404, err)
      if (vote === null) res.json(404, {"No such id": id})
      res.json(vote)
    });
  });

  app.put('/votes/:id', auth, function (req, res) {
    var id = req.params.id;
    console.log(req.body)
    Product.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) res.json(400, err)
      res.json(200, {Updated: numUpdated});
    });
  });

  app.delete('/votes/:id', auth, function (req, res) {
    var id = req.params.id;
    Product.remove({_id: id}, function (err) {
      if (err) res.json(400, err)
      res.json(200, {Deleted: id});
    });
  });
};
