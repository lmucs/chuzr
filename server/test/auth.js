require('./utils')

var should = require('should'),
    request = require('supertest'),  
    url = require('../config/config').test.url;
var userOne = {
  name: {
    first: 'Luna',
    last: 'Bar'
  },
  email: 'lunabar@example.com',
  login: 'lunaluna',
  reputation: 1000,
  socialHandle: 'lunabar',
  avatarURL: 'http://i.lunabar.com/luna.png',
  hashedPassword: 'qiyh4XPJGsOZ2MEAyLkfWqeQ'
};
var productOne = {
  name : "Kindle Fire HDX",
  description : "Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras",
  imageURL : "http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg",
  rating : 8,
  categories : ["tablet", "HD"],
  price : 379.99,
  related : ["iPad", "iPad Mini", "Microsoft Surface"]
};

describe('User Authentication', function(){
  describe('#accepted', function () {
    it('should return 201 while trying to post', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should return 200 while trying to put', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/users/' + res.body[0]._id).auth('testUser', 'testPass').send({reputation: 1001}).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
    it('should return 201 while trying to delete', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).del('/users/' + res.body[0]._id).auth('testUser', 'testPass').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  });
  
  describe('#denied', function () {
    it('should return 401 response code while trying to post', function (done) {
      request(url).post('/users').auth('testUser', 'testPast').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
    it('should return 401 while trying to put', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
      });
      request(url).get('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/users/' + res.body[0]._id).send({reputation: 1001}).auth('testUsers', 'letmein').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          done();
        })
      })
    })
    it('should return 401 while trying to delete', function (done) {
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).del('/users/' + res.body[0]._id).auth('iAmGeneric', '12345').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          done();
        })
      })      
    })
  });
  
  describe('#persistence', function() {
    it('should return 401 after the first authentication', function (done) {
      request(url).post('/users').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      request(url).post('/users').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
  });
});

describe('Product Authentication', function() {
  describe('#accepted', function () {
    it('should return 201 while trying to post', function (done) {
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should return 200 while trying to put', function (done) {
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/products').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/products/' + res.body[0]._id).auth('testUser', 'testPass').send({price: 400.00}).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
    it('should return 201 while trying to delete', function (done) {
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/products').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).del('/products/' + res.body[0]._id).auth('testUser', 'testPass').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  });
  describe('#denied', function () {
    it('should return 401 while trying to post', function (done) {
      request(url).post('/products').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
  });  
});

