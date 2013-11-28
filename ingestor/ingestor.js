var http = require('http'),
    massage = require('./massager'),
    parser = require('./parser');

var Ingestor = function () {

  var _retrieveData = function (url, parse, massage) {
    var data = '';
    http.get(url, function (res) {
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        var result = parse(data);
        massage(result);
      });
    }).on('error', function (err) {
    });
  };

  var _generateIngestionProcess = function (massageTree) {
    return function (url, parseFormat) {
      var parse = parser.generate(parseFormat);
      _retrieveData(url, parse, massageTree);
    };
  };

  return {
    shopzillaProduct : _generateIngestionProcess(massage.shopzillaProduct),
    shopzillaCategory : _generateIngestionProcess(massage.shopzillaCategory)
  };
}();

module.exports = Ingestor;
