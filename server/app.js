var express = require('express'),
    http = require('http'),
    fs = require('fs'),
    mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

mongoose.connect(config.db);

// Load models
fs.readdir(__dirname + '/models', function (err, files) {
  if (err) console.log(err);
  files.forEach(function (file) {
    if (file.match('.js$')) {
      require(__dirname + '/models/' + file);
    }
  });
});

// Load controllers
fs.readdir(__dirname + '/controllers', function (err, files) {
  if (err) console.log(err);
  files.forEach(function (file) {
    if (file.match('.js$')) {
      require(__dirname + '/controllers/' + file)(app);
    }
  });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
