var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    targz = require('tar.gz'),
    fs = require('fs');

var Extractor = function () {
  
    var _updates = function (zipped) {
      var unzipped = './updates/unzippedXml';
      var compress = new targz().extract(zipped, unzipped, function(err) {
        if(err) throw err;
        console.log('Shopzilla\'s xml updates are at' + unzipped);
      });
      return unzipped;
    };

 return {
    updates: _updates
 };
}();

module.exports = Extractor;
