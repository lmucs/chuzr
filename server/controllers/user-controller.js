module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id')
    }
    return id
  }

  app.get('/users', function (req, res) {
    res.send('Finding users');
  })

  app.post('/users', function (req, res) {
    res.send('Creating a user');
  })

  app.get('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Get user data for ' + id);
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
