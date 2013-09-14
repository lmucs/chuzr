coupon = require('../models/coupon')

module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id')
    }
    return id
  }

  app.get('/coupons', function (req, res) {
    res.send('Finding coupons');
  })

  app.post('/coupons', function (req, res) {
    res.send('Creating a coupon');
  })

  app.get('/coupons/:id', function (req, res) {
    id = validateId(req.params.id);
    try {
      res.json(coupon.findById(id));
    } catch (e) {
      if (e == coupon.NO_SUCH_coupon) {
        res.send(400, 'No such coupon');
      } else {
        throw e;
      }     
    }
  })

  app.put('/coupons/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Updating coupon ' + id);
  })

  app.delete('/coupons/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Deleting coupon ' + id);
  })
}
