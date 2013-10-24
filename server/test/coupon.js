require('./utils');

var should = require('should');
var request = require('supertest');  
var Coupon = require('../models/coupon');
var url = require('../config/config').test.url;
var async = require('async');


var couponOne = {
  issuer: "target",
  value: "Free TV",
  promoCode: "XJSD32",
  expirationDate: new Date(2013, 11, 6),
  imageURL: "http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg"
};

var couponTwo = {
  issuer: "amazon",
  value: "30% off Wii-U",
  promoCode: "EFHS79",
  expirationDate: new Date(2013, 9, 31),
  imageURL: "http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg"
};

var couponThree = {
  issuer: "best_buy",
  value: "20% off Best Buy",
  promoCode: "AJGD51",
  expirationDate: new Date(2014, 0, 31),
  imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"
};

var couponFour = {
  issuer: "lmu_bookstore",
  value: "Free Textbooks!",
  promoCode: "NEVR11",
  expirationDate: new Date(1980, 5, 6),
  imageURL: "http://www.universitybusiness.com/sites/default/files/styles/crop-tool-350x250/public/field/image/textboook.jpg?itok=i3kfC4uR"
};

var couponFive = {
  issuer: "target",
  value: "10% off Orbit gum",
  promoCode: "SKS143",
  expirationDate: new Date(2014, 0, 31),
  imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"
};

describe('Coupons Model', function(){

  describe('#create()', function () {
    it('should create without error', function (done) {
      Coupon.create(couponOne, function (err) {
        if (err) throw err;
        done();
      })
    })
    it('should assign all properties on creation', function (done) {
      Coupon.create(couponOne, function (err, coupon) {
        should.not.exist(err);
        coupon.issuer.should.equal("target")
        coupon.value.should.equal("Free TV")
        coupon.promoCode.should.equal("XJSD32")
        coupon.expirationDate.getTime().should.equal(1386316800000)
        coupon.imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg")
        done();
      })
    })
  })

});

describe('Coupons Controller', function () {

  describe('#search()', function () {
    it('should return an empty list when no coupons', function (done) {
      request(url).get('/coupons').end(function (err, res) {
        if (err) throw err;
        res.should.have.status(200);
        res.body.should.eql([]);
        done();
      })
    })
    
    it('should get by id without error', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Get that coupon by id.
        request(url).get('/coupons/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
    
    it('should return a list of two coupons', function (done) {
      //Create two coupons
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      
        request(url).post('/coupons').send(couponTwo).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(201);
      
          //Get coupons
          request(url).get('/coupons').end(function (err, res) {
            if (err) throw err;
            res.should.have.status(200)
            res.body[0].issuer.should.equal("target");
            res.body[0].value.should.equal("Free TV");
            res.body[0].promoCode.should.equal("XJSD32");
            res.body[0].expirationDate.should.equal("2013-12-06T08:00:00.000Z");
            res.body[0].imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg");
            res.body[1].issuer.should.equal("amazon");
            res.body[1].value.should.equal("30% off Wii-U");
            res.body[1].promoCode.should.equal("EFHS79");
            res.body[1].expirationDate.should.equal("2013-10-31T07:00:00.000Z");
            res.body[1].imageURL.should.equal("http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg");
            res.body.length.should.equal(2);
            done();
          })
        })
      }) 
    }); 
    
    it('should return two coupons with issuer=target', function (done) {
      //Create coupons
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponFive).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      //Get coupons issued by target
      request(url).get('/coupons?issuer=target').end(function (err, res) {
      if (err) throw err;
      res.should.have.status(200)
      res.body[0].issuer.should.equal("target");
      res.body[0].value.should.equal("Free TV");
      res.body[0].promoCode.should.equal("XJSD32");
      res.body[0].expirationDate.should.equal("2013-12-06T08:00:00.000Z");
      res.body[0].imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg");
      res.body[1].issuer.should.equal("target");
      res.body[1].value.should.equal("10% off Orbit gum");
      res.body[1].promoCode.should.equal("SKS143");
      res.body[1].expirationDate.should.equal("2014-01-31T08:00:00.000Z");
      res.body[1].imageURL.should.equal("http://cdn.savings.com/img/Best-Buy-Coupon.jpeg");
      res.body.length.should.equal(2);
      done();
      }) 
    }); 

    it('should return one expired coupon', function (done) {
      //Create coupons
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponFive).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      //Get expired coupons
      request(url).get('/coupons?status=expired').end(function (err, res) {
      if (err) throw err;
      res.should.have.status(200)
      res.body[0].issuer.should.equal("lmu_bookstore");
      res.body[0].value.should.equal("Free Textbooks!");
      res.body[0].promoCode.should.equal("NEVR11");
      res.body[0].expirationDate.should.equal("1980-06-06T07:00:00.000Z");
      res.body[0].imageURL.should.equal("http://www.universitybusiness.com/sites/default/files/styles/crop-tool-350x250/public/field/image/textboook.jpg?itok=i3kfC4uR");
      res.body.length.should.equal(1);
      done();
      }) 
    }); 	

    it('should return four active coupons', function (done) {
      //Create coupons
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponTwo).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponThree).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponFour).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      request(url).post('/coupons').send(couponFive).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
      })
      
      //Get active coupons
      request(url).get('/coupons?status=active').end(function (err, res) {
      if (err) throw err;
      res.should.have.status(200)
      res.body[0].issuer.should.equal("target");
      res.body[0].value.should.equal("Free TV");
      res.body[0].promoCode.should.equal("XJSD32");
      res.body[0].expirationDate.should.equal("2013-12-06T08:00:00.000Z");
      res.body[0].imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg");
      res.body[1].issuer.should.equal("amazon");
      res.body[1].value.should.equal("30% off Wii-U");
      res.body[1].promoCode.should.equal("EFHS79");
      res.body[1].expirationDate.should.equal("2013-10-31T07:00:00.000Z");
      res.body[1].imageURL.should.equal("http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg");
      res.body[2].issuer.should.equal("best_buy");
      res.body[2].value.should.equal("20% off Best Buy");
      res.body[2].promoCode.should.equal("AJGD51");
      res.body[2].expirationDate.should.equal("2014-01-31T08:00:00.000Z");
      res.body[2].imageURL.should.equal("http://cdn.savings.com/img/Best-Buy-Coupon.jpeg");
      res.body[3].issuer.should.equal("target");
      res.body[3].value.should.equal("10% off Orbit gum");
      res.body[3].promoCode.should.equal("SKS143");
      res.body[3].expirationDate.should.equal("2014-01-31T08:00:00.000Z");
      res.body[3].imageURL.should.equal("http://cdn.savings.com/img/Best-Buy-Coupon.jpeg");
      res.body.length.should.equal(4);
      done();
      }) 
    }); 
  })

  describe('#create()', function () {
    it('should create without error', function (done) {
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);
        done();
      })
    })
    
    it('should assign all properties on creation, including an _id', function (done) {
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.body.issuer.should.equal("target")
        res.body.value.should.equal("Free TV")
        res.body.promoCode.should.equal("XJSD32")
        res.body.expirationDate.should.equal("2013-12-06T08:00:00.000Z")
        res.body.imageURL.should.equal("http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg")
        Object.keys(res.body).length.should.equal(7);
        done();
      })
    })
  })

  describe('#delete()', function () {
    it('should delete without error', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        res.should.have.status(201);

        // Delete that coupon.
        request(url).del('/coupons/' + res.body._id).end(function (err, res) {
          if (err) throw err;
          res.should.have.status(200);
          done();
        })
      })
    })
  });
  
  describe('#update()', function () {
    it('should update without error', function (done) {
      // Create the coupon.
      request(url).post('/coupons').send(couponOne).end(function (err, res) {
        if (err) throw err;
        
        //Update that coupon.
        var id=res.body._id;
        
        request(url).put('/coupons/' + id).send(couponTwo).end(function (err, res2) {
          if (err) throw err;
          res2.should.have.status(200)
          
          //Ensure coupon has new data
          request(url).get('/coupons/' + id).end(function (err, response) {
            if (err) throw err;
            response.should.have.status(200)
            response.body.issuer.should.equal("amazon");
            response.body.value.should.equal("30% off Wii-U");
            response.body.promoCode.should.equal("EFHS79");
            response.body.expirationDate.should.equal("2013-10-31T07:00:00.000Z");
            response.body.imageURL.should.equal("http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg");
            done();
          })  
        })    
      })
    });
  });
});

