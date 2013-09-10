/* chuzr web service */

var express = require('express');
var http = require('http');
var mongoose = require('mongoose')

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('zombie marie curie'));
app.use(express.session());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// TODO - configure mongoose

require('./controllers/user-controller')(app)
require('./controllers/product-controller')(app)
require('./controllers/vote-controller')(app)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
