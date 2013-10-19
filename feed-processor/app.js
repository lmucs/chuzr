console.log('Configuring the Chuzr API');
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url').generate();

ingest.json(url);
