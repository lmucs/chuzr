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

  mustBeAdmin: function (req, res, operation) {
    User.findOne({login: req.user}, function (err, user) {
      if (!user.isAdmin) {
        res.json(403, {
          error: "Admin role required",
          operation: operation
        }); 
      }
    });
  },
  
  mustBeUnique: function (req, res, operation) {
    User.findOne({login: req.body.login}, function (err, user) {
      if (user) {
        res.json(400, {
          error: "Duplicate login",
          operation: operation
        });
      }
    });
  },

  mustHaveLegalRatingType: function (req, res) {
    if (["numeric","upDown","comparison"].indexOf(req.body.ratingType) === -1) {
      res.json(400, "Bad ratingType");
    }
  }
}
