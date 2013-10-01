var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var env = process.env.NODE_ENV || 'development';
var config = require('./config/config')[env];

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect(config.db);

require('./models/coupon');
require('./models/product');
require('./models/user');
require('./models/vote');

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
