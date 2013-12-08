var ftpClient = require('ftp'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    extractor = require('./extractor'),
    checker = require('./delta-checker'),
    ftpConfig = require('./config/shopzilla/ftp'),
    fs = require('fs');

var todaysDate = function() {
    var today = new Date();
    var dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    var mm = today.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    var yyyy = today.getFullYear();
    var currentFtpValue = yyyy.toString() + mm.toString() + dd.toString() + '00';
    return currentFtpValue;
}

var c = new ftpClient();
c.connect(ftpConfig);

if(c.connected) {
  console.log('connected to shopzilla')
  c.on('error', function(err) {
    console.log(err.code);
  });

  c.on('close', function(hadErr) { 
      if (hadErr) console.log('shopzilla connection closed with err');
      if (!hadErr) console.log('shopzilla connection closed');
  })

  c.on('end', function() {
      console.log('shopzilla connection closed');
  })

  c.on('ready', function () {
    console.log('client is ready');
    c.list('./xml-delta-1.0/', function(err, list) {
        console.log('deltas exist');
        if(err) throw err;
        if (list) {
            var currentFtpValue = todaysDate();
            for (var i = 0; i < list.length; i++ ) {
              if (+list[i].name > +currentFtpValue) {
              console.log('new deltas exist');
              currentFtpValue++;
              c.get('./xml-delta-1.0/' + list[i].name + '/publisher_all_updates.xml.gz', function(err, stream) {
                if(err) throw err;
                stream.on('data', function(chunk) {
                  var pathToUnzipped = require(extractor.updates(chunk));
                  checker.checkProduct(pathToUnzipped);  
                })
                stream.end('end', function(chunk) {
                    console.log('Your updates are complete');
                })
              });
            }
          }  
        } 
        else {
          console.log('No changes to products');
        }
        c.end();
    });
  });
} else {
  console.log('No connection to shopzilla server')
  c.destroy();
}
