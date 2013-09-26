var express = require('express');
var http = require('http');
var mongoose = require('mongoose');
var fs = require('fs');
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

// Bootstrap models
// fs.readdirSync(__dirname + '/models').forEach(function (file) {
//   if (~file.indexOf('.js')) {
//     require(__dirname + '/models/' + file);
//   }
// });
require('./models/user');

// Bootstrap controllers
// fs.readdirSync(__dirname + '/controllers').forEach(function (file) {
//   if (~file.indexOf('.js')) {
//     require(__dirname + '/controllers/' + file)(app);
//   }
// });
require('./controllers/user-controller')(app)

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
