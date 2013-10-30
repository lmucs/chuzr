var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');

module.exports = {

  development: {
    db: 'mongodb://localhost/chuzr_test',
    url: 'http://localhost/3001',
    secret: 'zombie feynman'
  }
};
