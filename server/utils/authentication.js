// API Authentication Utilities
//
// Usage:
//
//   var auth = require('./path/to/this/module');
//   app.post(url, adminRequired(function (req, res) {
//     ...
//   }));
//
// Well, this is pretty close to middleware. It should probably be cleaned up to be
// real middleware.

module.exports = {

  adminRequired: function (callback) {
    return function (req, res) {
      if (!req.session.userInfo) {
        return res.json(401, {message: 'Not logged in'});
      }
      if (!req.session.userInfo.isAdmin) {
        return res.json(403, {message: 'Administrator role required'});
      }
      return callback(req, res);
    };
  },

  loginRequired: function (callback) {
    return function (req, res) {
      if (!req.session.userInfo) {
        return res.json(401, {message: 'Not logged in'});
      }
      return callback(req, res);
    };
  }
};
