require('./utils')

var should = require('should'),
    request = require('supertest'),  
    url = require('../config/config').test.url,
    User = require('../models/user');
    
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
  hashedPassword: 'qiyh4XPJGsOZ2MEAyLkfWqeQ',
  isAdmin: false
};

var productOne = {
  name : "Kindle Fire HDX",
  description : "Startlingly light large-screen tablet, with stunning HDX display, ultra-fast performance, and front and rear cameras",
  url : "http://a.abcnews.com/images/Technology/HT_Kindle_Fire_HDX_Mayday_nt_130924_16x9_992.jpg",
  categoryId: 93,
  images : ["http://placehold.it/400x400", "http://placehold.it/200x200"],
  shopzillaId : 300,
  price : {min: 379.99, max: 700},
  related : [16, 22, 888]
};

var couponOne = {
  issuer: "target",
  value: "Free TV",
  promoCode: "XJSD32",
  expirationDate: new Date(2013, 11, 6),
  imageURL: "http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg"
};

var voteOne = {
  userId: 1,
  productId: 32,
  rating: 8
};

var admin = {
  name: {
    first: 'Addy',
    last: 'Ministrator'
  },
  email: 'admin@example.com',
  login: 'testUser',
  reputation: 9001,
  socialHandle: 'Admin',
  avatarURL: 'http://i.powertrip.com/iamadmin.jpg',
  hashedPassword: 'testPass',
  isAdmin: true
};

describe('User Authentication', function(){
  describe('#accepted', function () {
    it('should return 201 while trying to post', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should return 200 while trying to put', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
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
      User.create(admin, function (err) {
        if (err) throw err;
      })
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
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/users').auth('testUser', 'testPast').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
    it('should return 401 while trying to put', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
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
      User.create(admin, function (err) {
        if (err) throw err;
      })
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
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/users').send(userOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      request(url).post('/users').send(userOne).end(function (err, res) {
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
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should return 200 while trying to put', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
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
      User.create(admin, function (err) {
        if (err) throw err;
      })
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
      request(url).post('/products').send(productOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
    it('should return 401 while trying to put', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
      });
      request(url).get('/products').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/products/' + res.body[0]._id).send({price: 400.00}).auth('testUsers', 'password').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          done();
        })
      })
    })
    it('should return 401 while trying to delete', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/products').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).del('/products/' + res.body[0]._id).auth('bob', 'testPass').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          done();
        })
      })      
    })
  });
  
  describe('#persistence', function() {
    it('should return 401 after the first authentication', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/products').send(productOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      request(url).post('/products').send(productOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
  });
});  

describe('Coupon Authentication', function() {
  describe('#accepted', function () {
    it('should return 201 while trying to post', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/coupons').send(couponOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    it('should return 200 while trying to put', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/coupons').send(couponOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/coupons').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/coupons/' + res.body[0]._id).auth('testUser', 'testPass').send({issuer: "walmart"}).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
    it('should return 201 while trying to delete', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/coupons').send(couponOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/coupons').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).del('/coupons/' + res.body[0]._id).auth('testUser', 'testPass').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  });
  describe('#denied', function () {
    it('should return 401 while trying to post', function (done) {
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
    it('should return 401 while trying to put', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/coupons').send(couponOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
      });
      request(url).get('/coupons').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).put('/coupons/' + res.body[0]._id).send({price: 400.00}).auth('testUsers', 'testpass').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          done();
        })
      })
    })
    it('should return 401 while trying to delete', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/coupons').send(couponOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      });
      request(url).get('/coupons').auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        request(url).del('/coupons/' + res.body[0]._id).auth('user', 'testPass').end(function (err, res) {
          if (err) throw err;
          res.should.have.status(401);
          done();
        })
      })      
    })
  });
  describe('#persistence', function() {
    it('should return 401 after the first authentication', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/coupons').send(couponOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
  });  
});

describe('Vote Authentication', function() {
  describe('#accepted', function () {
    it('should return 201 while trying to post', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/votes').send(voteOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
  });
  describe('#denied', function () {
    it('should return 401 while trying to post', function (done) {
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })      
    })
  });
  describe('#persistence', function() {
    it('should return 401 after the first authentication', function (done) {
      User.create(admin, function (err) {
        if (err) throw err;
      })
      request(url).post('/votes').send(voteOne).auth('testUser', 'testPass').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      request(url).post('/votes').send(voteOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(401);
        done();
      })
    })
  });  
});
