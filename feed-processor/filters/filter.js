var Filter = function () {

  var _query = function (filters) {
    var result = [];
    for (k in filters) {
      result.push(k + '=' + filters[k]);
    }
    return result.join('&');
  };

  return {
    query : _query
  };

}();

module.exports = Filter;
