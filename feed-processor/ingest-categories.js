var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url'),
    categoryUrl = url.category;


console.log('use ' + config.db);

ingest.category(categoryUrl, "json");
