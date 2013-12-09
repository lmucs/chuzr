require('./utils');

var should = require('should');
var request = require('supertest');  
var Coupon = require('../models/coupon');
var User = require('../models/user');
var url = require('../config/config').test.url;

var testCoupons = [
  {
    issuer: "target",
    value: "Free TV",
    promoCode: "XJSD32",
    expirationDate: new Date(new Date().getTime() + 1E12),
    imageURL: "http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg"
  },
  {
    issuer: "amazon",
    value: "30% off Wii-U",
    promoCode: "EFHS79",
    expirationDate: new Date(new Date().getTime() + 1E12),
    imageURL: "http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg"
  },
  {
    issuer: "best_buy",
    value: "20% off Best Buy",
    promoCode: "AJGD51",
    expirationDate: new Date(new Date().getTime() + 1E12),
    imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"
  },
  {
    issuer: "lmu_bookstore",
    value: "Free Textbooks!",
    promoCode: "NEVR11",
    expirationDate: new Date(new Date().getTime() - 1E12),
    imageURL: "http://www.universitybusiness.com/sites/default/files/styles/crop-tool-350x250/public/field/image/textboook.jpg?itok=i3kfC4uR"
  },
  {
    issuer: "target",
    value: "10% off Orbit gum",
    promoCode: "SKS143",
    expirationDate: new Date(new Date().getTime() + 1E12),
    imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"
  }
];

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

/*
 * Asserts that two coupon representations are the same. The coupons can be either
 * (1) actual coupon model objects, (2) plain JavaScript objects with coupon properties,
 * or (3) JSON representations returned from the API.  Because coupons from mongo can
 * have extra properties like _id and _v, we only compare the basic coupon properties.
 */
function couponsShouldBeSame(coupon, other) {
  var dateFor = function (date) {
    return date instanceof Date ? date.toISOString() : date
  }
  coupon.issuer.should.equal(other.issuer);
  coupon.value.should.equal(other.value);
  coupon.promoCode.should.equal(other.promoCode);
  dateFor(coupon.expirationDate).should.equal(dateFor(other.expirationDate));
  coupon.imageURL.should.eql(other.imageURL);
}

/*
 * Inserts from an array then calls the callback AFTER all coupons are inserted.
 */
function insertCoupons(coupons, callback) {
  User.create(admin, function (err) {
    should.not.exist(err);
    var form = {email:admin.email, pass: 'testPass'}
    request(url).post('/sessions').type("form").send(form).end(function (err, res) {
      if (err) throw err;
      var cookies = res.headers['set-cookie'].pop().split(';')[0];
      var idsCreated = []
      if (coupons.length === 0) return callback([]);
      for (var i = 0; i < coupons.length; i++) {
        req = request(url).post('/coupons');
        req.cookies = cookies;
        req.send(coupons[i]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(201);
          idsCreated.push(res.body._id)
          if (idsCreated.length === coupons.length) return callback(idsCreated);
        });
      }
    });
  });
}

describe('Coupon Model', function() {

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(testCoupons[0], function (err) {
        should.not.exist(err);
        done();
      })
    });

    it('should assign all properties on creation', function (done) {
      Coupon.create(testCoupons[0], function (err, coupon) {
        should.not.exist(err);
        coupon.should.have.properties(Object.keys(testCoupons[0]))
        couponsShouldBeSame(coupon, testCoupons[0])
        done();
      })
    })
  })
});

describe('Coupon Controller', function() {

  describe('retrieve', function () {

    it('should get by id correctly', function (done) {
      insertCoupons([testCoupons[0]], function (idsCreated) {
        request(url).get('/coupons/' + idsCreated[0]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.should.be.json;
          done();
        })
      })
    })
  })
    
  describe('search', function () {

    it('should return a list of two coupons if two inserted', function (done) {
      insertCoupons([testCoupons[0], testCoupons[1]], function () {
        request(url).get('/coupons').end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.length.should.equal(2);
          coupon1 = res.body[0];
          coupon2 = res.body[1];
          (coupon1.promoCode === "EFHS79" || coupon2.promoCode === "EFHS79").should.be.ok
          done();
        })
      }) 
    }); 
    
    it('should return two coupons with issuer=target', function (done) {
      insertCoupons(testCoupons, function () {
        request(url).get('/coupons?issuer=target').end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          res.body.length.should.equal(2);
          done();
        })
      })
    }); 

    it('should return one expired coupon', function (done) {
      insertCoupons(testCoupons, function () {
        request(url).get('/coupons?status=expired').end(function (err, res) {
          should.not.exist(err)
          res.should.have.status(200)
          couponsShouldBeSame(res.body[0], testCoupons[3])
          res.body.length.should.equal(1);
          done();
        })
      })
    }); 	

    it('should return four active coupons', function (done) {
      insertCoupons(testCoupons, function () {
        request(url).get('/coupons?status=active').end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200)
          res.body.length.should.equal(4);
          done();
        })
      })
    });  

    describe('pagination', function () {
      it('should have a default limit of 10', function (done) {
        insertCoupons(testCoupons.concat(testCoupons, testCoupons), function () {
          request(url).get('/coupons').end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200)
            res.body.length.should.equal(10);
            done();
          })
        })
      })
      it('should respect the limit', function (done) {
        insertCoupons(testCoupons.concat(testCoupons, testCoupons), function () {
          request(url).get('/coupons?limit=8').end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200)
            res.body.length.should.equal(8);
            done();
          })
        })
      })
      it('should treat the skip properly', function (done) {
        insertCoupons(testCoupons.concat(testCoupons, testCoupons), function () {
          request(url).get('/coupons?skip=12&limit=100').end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200)
            res.body.length.should.equal(3);
            done();
          })
        })
      })
    })
  });

  describe('delete', function () {
    it('should delete correctly', function (done) {

      // Create the coupon
      insertCoupons([testCoupons[0]], function (idsCreated) {
        var id = idsCreated[0];

        // Delete that coupon
        request(url).del('/coupons/' + id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);

          // It should be deleted (404 on get by id)
          request(url).get('/coupons/' + id).end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(404);
            done();
          });
        });
      });
    });
  });
  
  describe('update', function () {
    it('should update correctly', function (done) {
      
      // Create the coupon
      insertCoupons([testCoupons[0]], function (idsCreated) {
        var id = idsCreated[0];
        
        // Update that coupon
        request(url).put('/coupons/' + id).send(testCoupons[1]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          
          // Ensure coupon has new data
          request(url).get('/coupons/' + id).end(function (err, res) {
            should.not.exist(err);
            res.should.have.status(200);
            couponsShouldBeSame(res.body, testCoupons[1]);
            done();
          });
        });   
      });
    });
  });
});
