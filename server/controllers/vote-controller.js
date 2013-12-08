var Vote = require('../models/vote');
var pagination = require('../utils/pagination');
var validator = require('../utils/validator');
var auth = require('../utils/authentication');

module.exports = function (app) {

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
    if (req.query.ratingType) {
      search["ratingType"] = req.query.ratingType;
    }
    Vote.find(search, null, pagination(req), function (err, votes) {
      if (err) return res.json(500, err);
      res.json(200, votes);
    });
  });

  app.post('/votes', auth.loginRequired(function (req, res) {
    validator.mustHaveLegalRatingType(req, res);

    // Auto generate the timestamp and active elements
    req.body.timestamp = Date.now();
    req.body.active = true;

    // If this is a re-vote, update the old one to inactive
    var revoteSearch = {
      userId: req.body.userId,
      productId: req.body.productId,
      ratingType: req.body.ratingType,
      active: true
    };
    Vote.findOne(revoteSearch, null, function (err, vote) {
      if (err) return res.json(500, err);
      if (vote) {
        Vote.update({"_id": vote._id}, {"$set": {"active": false}}, function (err, num) {
          if (err) return res.json(400, err);
        });
      } else {
        Vote.create(req.body, function (err, vote) {
          if (err) return res.send(400, err);
          res.send(201, vote);
        })
      }
    });
  }));

  app.get('/votes/:id', function (req, res) {
    var id = req.params.id;
    Vote.findById(id, null, function (err, vote) {
      if (err) return res.json(404, err);
      if (!vote) return res.json(404, {"No such vote": id});
      res.json(vote);
    });
  });
};
