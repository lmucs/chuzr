User = require('../models/user')

module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id')
    }
    return id
  }

  app.get('/users', function (req, res) {
    res.json(200, 'Finding users');
  })

  app.post('/users', function (req, res) {
    res.json(200, 'Creating a user');
  })

  app.get('/users/:id', function (req, res) {
    id = validateId(req.params.id);
    try {
      res.send(User.findById(id));
    } catch (e) {
      if (e == User.NO_SUCH_USER) {
        res.json(400, 'No such user');
      } else {
        throw e;
      }     
    }
  })

  app.put('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.json(200, 'Updating user ' + id);
  })

  app.delete('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.json(200, 'Deleting user ' + id);
  })
}
