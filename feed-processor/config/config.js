var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/chuzr_ingestor_dev',
    root: rootPath,
    app: {
      name: 'Chuzr'
    }
  },

  test: {
    db: 'mongodb://localhost/chuzr_ingestor_test',
    root: rootPath,
    app: {
      name: 'Chuzr'
    }
  },

  production: { }

};
