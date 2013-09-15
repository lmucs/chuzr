User = require('../models/user')

module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateUserId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };

  app.get('/users', function (req, res) {
    console.log("Status Code: ", res.statusCode);
    skip = +req.query.skip || 0;
    limit = +req.query.limit || 10;
    console.log('skip = %d, limit = %d', skip, limit);
    res.json(User.findAll(skip=skip, limit=limit));
  });

  app.post('/users', function (req, res) {
    //res.send('Creating a user');
    var user = new User();
    //Assuming we are using the mongoose model.js
    user.save(function (error) {
        if (!error) {
            return res.send("user added");
        } else {
            return res.send(error);
        }
        });
        return res.send(user);
  });

  app.get('/users/:id', function (req, res) {
    id = validateUserId(req.params.id);
    try {
      res.json(User.findById(id));
    } catch (e) {
      if (e == User.NO_SUCH_USER) {
        res.send(400, 'No such user');
      } else {
        throw e;
      }     
    }
  });

  app.put('/users/:id', function (req, res) {
    var id = validateUserId(req.params.id),
    user = User.findById(id);
    return user.save(function (error) {
        if (!error) {
            res.send("User updated");
        } else {
            res.send(error);
        }
    });
    return res.send(user);
  });

    app.delete('users/:id', function (req, res) {
        var id = validateUserId(req.params.id),
        user = User.findById(id);
        return user.remove(function (error) {
            if (!error) {
                return res.send("User removed");
            } else {
                res.send(error);
            }
        });
    });
}
