var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'chuzr_dev',
    root: rootPath,
    app: {
      name: 'Chuzr Ingestor'
    }
  },

  test: {
    db: 'chuzr_test',
    root: rootPath,
    app: {
      name: 'Chuzr Ingestor'
    }
  },

  production: { }

};
