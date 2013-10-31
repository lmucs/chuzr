var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url').generate();

console.log('use ' + config.db);

ingest.json(url);
