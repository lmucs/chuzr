console.log('Configuring the Chuzr API');
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url').generate(),
    mongoose = require('mongoose');

console.log('Connecting to Mongo at %s', config.db);
mongoose.connect(config.db);

ingest.json(url);
