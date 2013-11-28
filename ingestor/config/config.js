var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'chuzr_dev',
    dbPath: 'mongodb://localhost/chuzr_dev',
    root: rootPath,
    app: {
      name: 'Chuzr Ingestor'
    }
  },

  test: {
    db: 'chuzr_test',
    dbPath: 'mongodb://localhost/chuzr_test',
    root: rootPath,
    app: {
      name: 'Chuzr Ingestor'
    }
  },

  production: { }

};
