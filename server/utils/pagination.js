// Pagination for search queries
//
// Usage:
//
//   var pagination = require('./path/to/this/module');
//   app.get(url, function (req, res) {
//     ...
//     Model.find(query, fields, pagination(req), callback)
//   });

// TODO: Suggest defaultPageSize and minimumPageSize come from application conf
var minimumPageSize = 1;
var defaultPageSize = 10;
var maximumPageSize = 100;

module.exports = function (req) {
  var skip = +req.query.skip || 0;
  var limit = +req.query.limit || defaultPageSize;
  limit = Math.min(Math.max(limit, minimumPageSize), maximumPageSize);
  return {skip: skip, limit: limit};
}
