User = require('../models/user')

module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateUserId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
  return id;
  };
  
  function pagination (req) {
    return {skip: +req.query.skip || 0, limit: +req.query.limit || 10 }
  }

  app.get('/users', function (req, res) {
    search = {};
    if (req.query.name) {
      search['name'] = {'$regex': '^' + req.query.name, '$options': 'i'}
    }
    console.log("Searching Users: &j", search)
    User.find(search, null, pagination(req), function (err, docs) {
      if (err) res.json(500, err)
      res.json(docs);
    });
  });

  app.post('/users', function (req, res) {
    User.create(req.body, function(err, user) {
      if (err) res.json(400, err)
      res.send(201, user);
    });
  });

  app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    User.create(req.body, function (err, user) {
      if (err) res.json(400, err)
      res.send(201, user);
    });
  });

  app.put('/users/:id', function (req, res) {
    var id = req.params.id,
    console.log(req.body)
    User.update({_id: id}, req.body, function (err, doc) {
      if (err) res.json(400, err)
      res.json(200, {Updated: doc});
    });
  });

  app.delete('/users/:id', function (req, res) {
      var id = validateUserId(req.params.id),
      user = User.findById(id);
      User.delete(id);
      res.json("User Deleted");
      /*
      user.remove(function (error) {
        return error ? res.send(error) : res.send("user removed");
      });
      */
  });
};

