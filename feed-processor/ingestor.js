var http = require('http');
var parseXML = require('xml2js').parseString;

var Ingestor = function () {

  var _retrieveData = function (url, parse) {
    var data = '';
    console.log('Retrieving data from', url);
    http.get(url, function (res) {
      console.log('Attempting get...');
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        var result = parse(data);
        var productArray = result.products.product;
        for (p in productArray) {
            console.log(productArray[p]);
        }
        // DatabaseLoader.load(product)
        console.log('Ingestion complete.');
      });
    }).on('error', function (err) {
      console.log('Error retrieving data: ', err);
    });
  };

  var _xml = function (url) {
    console.log('Ingesting xml...');
    _retrieveData(url, function (data) {
      return parseXML(data, function (err, result) {
        if (err) console.log('Error parsing xml: ', err);
      });
    });
  };

  var _json = function (url) {
    console.log('Ingesting json...');
    _retrieveData(url, function (data) {
      return JSON.parse(data);
    });
  };

  return {
    xml : _xml,
    json : _json
  };
}();

module.exports = Ingestor;
