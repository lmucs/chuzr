var ingest = require('./ingestor'),
    url = require('./url'),
    category = require('./config/shopzilla/category')
    categoryUrl = url.generate(category);

ingest.taxonomy(categoryUrl);
