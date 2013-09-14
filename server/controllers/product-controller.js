User = require('../models/product')

module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id')
    }
    return id
  }

  app.get('/products', function (req, res) {
    res.send('Finding products');
  })

  app.post('/products', function (req, res) {
    res.send('Creating a product');
  })

  app.get('/products/:id', function (req, res) {
    id = validateId(req.params.id);
    try {
      res.json(Product.findById(id));
    } catch (e) {
      if (e == Product.NO_SUCH_PRODUCT) {
        res.send(400, 'No such product');
      } else {
        throw e;
      }     
    }
  })

  app.patch('/products/:id', function (req, res) {
  	// TODO
  })

  app.put('/products/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Updating product ' + id);
  })

  app.delete('/productd/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Deleting product ' + id);
  })
}
