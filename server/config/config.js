var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/chuzr_dev',
    url: 'http://localhost:3000',
    root: rootPath,
    app: {
      name: 'Chuzr'
    }
  },

  test: {
    db: 'mongodb://localhost/chuzr_test',
    url: 'http://localhost:3000',
    root: rootPath,
    app: {
      name: 'Chuzr'
    }
  },

  production: { }

};
