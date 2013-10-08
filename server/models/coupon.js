var VALID_PROPERTIES = [
  'issuer', 'value', 'promoCode', 'expirationDate', 'imageURL'
];

/** Adds couponData values to coupon if the corresponding properties are valid **/
function addProperties (coupon, couponData) {
  VALID_PROPERTIES.forEach(function (property) {
    if (property in couponData) {
      coupon[property] = couponData[property];
    }
  }, coupon);
};

/** Coupon Constructor **/
module.exports = Coupon = function (couponData) {

  this.id = maxId++;
  addProperties(this, couponData);
  mockCoupons.push(this);
}

Object.defineProperty(Coupon, 'NO_SUCH_COUPON', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {}
});

/** Returns all coupons **/
Coupon.findAll = function (skip, limit) {
  return mockCoupons.slice(skip, skip + limit);
}

/** Returns coupon of the given id **/
Coupon.findById = function (id) {
  for (var i = 0; i < mockCoupons.length; i++) {
    if (+id === mockCoupons[i].id) {
      return mockCoupons[i];
    }
  }
  throw Coupon.NO_SUCH_COUPON;
}

/** Returns all coupons with the same issuer **/
Coupon.findByIssuer = function (issuer) {
  var coupons = [];

  for (var i = 0; i < mockCoupons.length; i++) {
    if (issuer === mockCoupons[i].issuer) {
      coupons.push(mockCoupons[i]);
    }
  }
  //TODO: throw error if issuer doesn't exist or if that issuer has no coupons
  return coupons;
}

/** Returns all coupons that are expired or all coupons that are active **/
Coupon.findByStatus = function (status) {
  var coupons = [];
  var currentDate = new Date();

  if (status === "active") {
	for (var i = 0; i < mockCoupons.length; i++) {
	  if (mockCoupons[i].expirationDate - currentDate >= 0) {
		coupons.push(mockCoupons[i]);
	  }
	}
  }
  if (status === "expired") {
	for (var i = 0; i < mockCoupons.length; i++) {
	  if (mockCoupons[i].expirationDate - currentDate < 0) {
		coupons.push(mockCoupons[i]);
	  }
	}
  }

  return coupons;
}

/** Change coupon data **/
Coupon.update = function (obj, couponData) {
  addProperties(obj, couponData);
}

Coupon.delete = function (id) {
    return mockCoupons.splice(id, 1);
}

var mockCoupons = [];
var maxId = 0;

new Coupon({issuer: "target", value: "Free TV", promoCode: "XJSD32", expirationDate: new Date(2013, 11, 6), imageURL: "http://opportunemployment.com/wp-content/uploads/2010/05/old-tv-set.jpg"});
new Coupon({issuer: "amazon", value: "30% off Wii-U", promoCode: "EFHS79", expirationDate: new Date(2013, 9, 31), imageURL: "http://www.prlog.org/11992135-amazon-coupon-code-october-2012.jpg"});
new Coupon({issuer: "best_buy", value: "20% off Best Buy", promoCode: "AJGD51", expirationDate: new Date(2014, 0, 31), imageURL: "http://cdn.savings.com/img/Best-Buy-Coupon.jpeg"});
new Coupon({issuer: "lmu_bookstore", value: "Free Textbooks!", promoCode: "NEVR11", expirationDate: new Date(1980, 5, 6), imageURL: "http://www.universitybusiness.com/sites/default/files/styles/crop-tool-350x250/public/field/image/textboook.jpg?itok=i3kfC4uR"});
new Coupon({issuer: "that's_showbiz", value: "Buy 2 Get 1 Free", promoCode: "ZHYF23", expirationDate: new Date(2013, 3, 26), imageURL: "http://thumbs.dreamstime.com/x/blue-coupon-ticket-17642622.jpg"});

