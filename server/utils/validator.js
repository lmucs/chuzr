// API validator
//
// Usage:
//
//   var validator = require('./path/to/this/module');
//   app.put(url, function (req, res) {
//     ...
//     validator.mustBeAdmin(req, res, 'update product'); // 403 if not admin
//   });
//
//   app.get(url, function (req, res) {
//     validator.mustHaveLegalRatingType(req, res);
//     ...
//   })

var User = require('../models/user');

module.exports = {

  adminCheck: function (req, res, operation) {
    if (!req.session.userInfo && !req.session.userInfo.isAdmin) {
      res.json(403, {
        error: "Admin role required",
        operation: operation
      });
      return false; 
    } else {
      return true;
    }
  },

  mustHaveLegalRatingType: function (req, res) {
    if (["numeric","upDown","comparison"].indexOf(req.body.ratingType) === -1) {
      res.json(400, "Bad ratingType");
    }
  }
}
