require('./utils');

var should = require('should');
var request = require('supertest');  
var Coupon = require('../models/coupon');
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

function insertCoupons(coupons, callback) {
  var couponsRemaining = coupons.length;
  if (coupons.length === 0) {
    callback();
  }
  for (var i = 0; i < coupons.length; i++) {
    request(url).post('/coupons').send(coupons[i]).end(function (err, res) {
      should.not.exist(err);
      res.should.have.status(201);
      couponsRemaining--;
      if (couponsRemaining === 0) {
        callback();
      }
    });
  }
}

describe('Coupons Model', function() {

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

  describe('#retrieve()', function () {
    it('should get by id correctly', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(testCoupons[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        res.should.be.json;

        // Get that coupon by id.
        request(url).get('/coupons/' + res.body._id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);
          res.should.be.json;
          done();
        })
      })
    })
  })
    
  describe('#search()', function () {

    it('should return a list of two coupons if two inserted', function (done) {

      //Create two coupons
      request(url).post('/coupons').send(testCoupons[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
      
        request(url).post('/coupons').send(testCoupons[1]).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(201);
      
          //Get coupons
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

    describe('#pagination', function () {
    })

  });

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(testCoupons[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        var id = res.body._id;

        // Delete that coupon.
        request(url).del('/coupons/' + id).end(function (err, res) {
          should.not.exist(err);
          res.should.have.status(200);

          // It should be deleted
          request(url).get('/coupons/' + id).end(function (err, res) {
            should.not.exist(err);
            console.log(res.body)
            res.should.have.status(404);
            done();
          });
        });
      });
    });
  });
  
  describe('#update()', function () {
    it('should update correctly', function (done) {
      
      // Create the coupon
      request(url).post('/coupons').send(testCoupons[0]).end(function (err, res) {
        should.not.exist(err);
        res.should.have.status(201);
        
        // Update that coupon
        var id = res.body._id;
        
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
