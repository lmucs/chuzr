var User = require('../models/user');
var express = require('express');
var pagination = require('../utils/pagination');
var auth = require('../utils/authentication');

module.exports = function (app) {
  
  app.get('/users', function (req, res) {
    search = {};
    if (req.query.name) {
      search['name'] = {'$regex': '^' + req.query.name, '$options': 'i'}
    }
    User.find(search, null, pagination(req), function (err, docs) {
      if (err) return res.json(500, err)
      res.json(docs);
    });
  });

  app.post('/users', function (req, res) {
    //Tests needed
    if (req.body.isAdmin && !req.session.userInfo.isAdmin) {
      return res.json(401, {message: "Only admins may create other admins."})
    }
    User.create(req.body, function(err, user) {
      if (err) return res.json(400, err)
      res.send(201, user);
    });
  });

  app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
      if (err) return res.json(400, err)
      if (!user) return res.json(404, {"No such user": id})
      res.json(user)
    });
  });

  app.put('/users/:id', auth.loginRequired(function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
      if (err) return res.json(400, err)
      if (!user) return res.json(404, {"No such user": id})
      if (req.session.userInfo._id != id && !req.session.userInfo.isAdmin) {
        return res.json(403, {message: "You may only modify your own account."});
      }
      if (!user.isAdmin && !req.session.userInfo.isAdmin) {
        // Prevent a user from making itself an admin
        req.body.isAdmin = false;
      }
      User.update({_id: id}, req.body, function (err, numUpdated) {
        if (err) return res.json(400, err)
        res.json(200, {'Number updated': numUpdated});
      });
    });
  }));

  app.delete('/users/:id', auth.adminRequired(function (req, res) {
    var id = req.params.id;
    User.remove({_id: id}, function (err) {
      if (err) return res.json(400, err)
      res.json(200, {Deleted: id});
    });
  }));

  app.post('/sessions', function (req, res) {
    User.findOne({email: req.body.email}, function (err, user) {
      if (err) res.json(500, err);
      if (!user) return res.json(404, {message: 'Invalid email/password combination'});
      user.checkPassword(req.body.pass, function (err, isMatch) {
        if (err) return res.json(500, err);
        if (!isMatch) return res.json(404, {message: 'Invalid email/password combination'});
        req.session.userInfo = user;
        res.header('Access-Control-Allow-Credentials', 'true');
        res.json(200, {'Logged in': req.body.email});
      });
    });
  });

  app.delete('/sessions', function (req, res) {
    req.session.userInfo = undefined;
    res.json(200, {'Logged out': true});
  });
}
