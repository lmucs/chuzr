var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    ingest = require('./ingestor'),
    url = require('./url'),
    shopzillaProduct = require('./config/shopzilla/product'),
    productUrl = url.generate(shopzillaProduct);


console.log('use ' + config.db);

ingest.shopzillaProduct(productUrl, 'json');
