var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/chuzr_dev',
    host: 'localhost',
    port: 27017,
    url: 'http://' + this.host + '/' + this.port,
    secret: 'zombie feynman',
    root: rootPath,
    app: {
      name: 'Chuzr'
    }
  },

  test: {
    db: 'mongodb://localhost/chuzr_test',
    host: 'localhost',
    port: 27017,
    url: 'http://' + this.host + '/' + this.port,
    secret: 'zombie feynman',
    root: rootPath,
    app: {
      name: 'Chuzr'
    }
  }
};
