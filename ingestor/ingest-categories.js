var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url'),
    category = require('./config/shopzilla/category'),
    categoryUrl = url.generate(category, 'taxonomy');


console.log('use ' + config.db);

ingest.category(categoryUrl, 'json');
