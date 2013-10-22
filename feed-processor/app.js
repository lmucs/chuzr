console.log('Configuring the Chuzr API');
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    mongoose = require('mongoose');

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db);

var url = 'http://www.beso.com/users/MrsClassic/favorites.json';
ingest.json(url);
