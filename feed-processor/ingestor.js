var http = require('http');
var parseXML = require('xml2js').parseString;
var url = 'http://www.beso.com/users/MrsClassic/favorites.json';
// var url = 'http://www.w3schools.com/xml/note.xml';

http.get(url, function(res) {
    var body = '';
    var parse;

    res.on('data', function(chunk) {
        body += chunk;
    });

    res.on('end', function() {
        var response;
        try {
          response = JSON.parse(body);
        } catch (e) {
          parseXML(body, function (err, result) {
            if (err) console.log(err);
            response = result;
          });
        }
        console.log("Got response: ", JSON.stringify(response));
    });
}).on('error', function(e) {
      console.log("Got error: ", e);
});
