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
    skip = +req.query.skip || 0 
    limit = +req.query.limit || 10 
    console.log('skip = %d, limit = %d', skip, limit)
    res.json(User.findAll(skip=skip, limit=limit))
  })

  app.post('/users', function (req, res) {
    res.send('Creating a user');
  })

  app.get('/users/:id', function (req, res) {
    id = validateId(req.params.id);
    try {
      res.json(User.findById(id));
    } catch (e) {
      if (e == User.NO_SUCH_USER) {
        res.send(400, 'No such user');
      } else {
        throw e;
      }     
    }
  })

  app.put('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Updating user ' + id);
  })

  app.delete('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Deleting user ' + id);
  })
}
