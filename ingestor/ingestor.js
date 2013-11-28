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
        console.log(massage(result));
      });
    }).on('error', function (err) {
    });
  };

  var _generateIngestionProcess = function (massageProcess) {
    return function (url) {
      _retrieveData(url, parser["json"], massageProcess);
    };
  };

  return {
    products: _generateIngestionProcess(massage.products),
    taxonomy: _generateIngestionProcess(massage.taxonomy)
  };
}();

module.exports = Ingestor;
