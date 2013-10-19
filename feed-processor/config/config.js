var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    api = require('./api');

module.exports = {

  development: {
    db: 'mongodb://localhost/chuzr_ingestor_dev',
    root: rootPath,
    api_key: api.key,
    api_id: api.id,
    app: {
      name: 'Chuzr'
    }
  },

  test: {
    db: 'mongodb://localhost/chuzr_ingestor_test',
    root: rootPath,
    api_key: api.key,
    api_id: api.id,
    app: {
      name: 'Chuzr'
    }
  },

  production: { }

};
