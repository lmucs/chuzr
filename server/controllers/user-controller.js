var User = require('../models/user');
var express = require('express');
var auth = require('../authentication/auth-controller').auth;
var pagination = require('../utils/pagination');

module.exports = function (app) {
  
  app.get('/users', function (req, res) {
    search = {};
    if (req.query.name) {
      search['name'] = {'$regex': '^' + req.query.name, '$options': 'i'}
    }
    console.log("Searching Users: %j", search)
    User.find(search, null, pagination(req), function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
  });

  app.post('/users', auth, function (req, res) {
    User.create(req.body, function(err, user) {
      if (err) res.json(400, err)
      res.send(201, user);
    });
  });

  app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
      if (err) res.json(400, err)
      if (user === null) res.json(404, {"No such user": id})
      res.json(user)
    });
  });

  app.put('/users/:id', auth, function (req, res) {
    var id = req.params.id;
    User.findOne({login: req.user}, function (err, user) {
      if (user._id != id) {
        if (!user.isAdmin) {
          res.json(403, {message: "You may only modify your own account."});
        }
      }
    });
    console.log(req.body)
    User.update({_id: id}, req.body, function (err, numUpdated) {
      if (err) res.json(400, err)
      res.json(200, {'Number updated': numUpdated});
    });
  });

  app.delete('/users/:id', auth, function (req, res) {
    var id = req.params.id;
    User.remove({_id: id}, function (err) {
      if (err) res.json(400, err)
      res.json(200, {Deleted: id});
    });
  });
}

