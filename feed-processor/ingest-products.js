var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url'),
    productUrl = url.product;


console.log('use ' + config.db);

ingest.shopzillaProduct(productUrl, "json");
