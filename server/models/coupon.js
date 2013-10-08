var VALID_PROPERTIES = [
  'issuer', 'value', 'promoCode', 'expirationDate', 'imageURL'
];

module.exports = Coupon = function (couponData) {

  this.id = maxId++;

  VALID_PROPERTIES.forEach(function (property) {
    if (property in couponData) {
      this[property] = couponData[property];
    }
  }, this);

  //mock data
  mockCoupons.push(this);
}

Object.defineProperty(Coupon, 'NO_SUCH_COUPON', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {}
});

Coupon.findAll = function (skip, limit) {
  return mockCoupons.slice(skip, skip + limit);
}

Coupon.findById = function (id) {
  // HAHA OBVIOUSLY THIS IS NOT THE REAL FINAL CODE
  for (var i = 0; i < mockCoupons.length; i++) {
    if (+id === mockCoupons[i].id) {
      return mockCoupons[i];
    }
  }
  throw Coupon.NO_SUCH_COUPON;
}

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

Coupon.prototype.isExpired = function () {
  var currentDate = new Date();
  return this.expirationDate < currentDate;
};

Coupon.prototype.save = function (id, couponData) {

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

