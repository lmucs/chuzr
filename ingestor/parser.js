var Parser = function() {

  var parsers = {
    "json" : function (url) { return JSON.parse(data); }
  };

  var generate = function (parseFormat) {
    return parsers[parseFormat];
  };

  return {
    generate : generate
  };

}();

module.exports = Parser;
