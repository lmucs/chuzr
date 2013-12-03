var express = require('express');
var http = require('http');
var path = require('path');
var stylus = require('stylus');


var app = express();



app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon(path.join(__dirname, 'public/icons/favicon.png')));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('zombie feynman'));
app.use(express.session());
app.use(app.router);
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

require('././controllers/main')(app);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});