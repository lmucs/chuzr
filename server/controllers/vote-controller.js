Vote = require('../models/vote')

module.exports = function (app) {

  function pagination(req) {
    return {skip: +req.query.skip || 0, limit: +req.query.limit || 10}
  }

  // Get all the votes or get votes by userId and/or productId and/or active state
  app.get('/votes', function (req, res) {
    var search = {};

    if (req.query.userId) {
      search["userId"] = req.query.userId;
    }
    if (req.query.productId) {
      search["productId"] = req.query.productId;
    }
    if (req.query.active) {
      search["active"] = req.query.active;
    }
    Vote.find(search, null, pagination(req), function (err, votes) {
      if (err) res.json(500, err);
      res.json(200, votes);
    });

  });

  app.post('/votes', function (req, res) {
    var user = req.body.userId,
        product = req.body.productId;
    // Auto generate the timestamp and active elements
    req.body.timestamp = Date.now();
    req.body.active = true;

    // Update last active vote to inactive
    Vote.findOne(
      {"userId": user, "productId": product, "active": true}, null, function (err, vote) {
      if (err) res.json(500, err);
      if (vote) Vote.update({"_id": vote._id}, {$set: {"active": false}}, function (err, numberUpdated) {
        if (err) res.json(400, err);
      });
    });

    Vote.create(req.body, function (err, vote) {
      if (err) res.send(400, err);
      res.send(201, vote);
    })
  });

  // Get a vote by its id
  app.get('/votes/:id', function (req, res) {
    var id = req.params.id;
    Vote.findById(id, null, function (err, vote) {
      if (err) res.json(404, err);
      if (vote === null) res.json(404, {"No such id": id});
      res.json(vote);
    });
  });
};
