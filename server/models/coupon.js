var VALID_PROPERTIES = [
  'issuer', 'value', 'promoCode', 'expirationDate'
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

Coupon.prototype.save = function (id, couponData) {

}

Coupon.prototype.delete = function (id) {
    
}

var mockCoupons = [];
var maxId = 0;

new Coupon({issuer: "Target", value: "Free TV", promoCode: "XJSD32", expirationDate: new Date(2013, 11, 6)});
new Coupon({issuer: "Amazon", value: "30% off Wii-U", promoCode: "EFHS79", expirationDate: new Date(2013, 9, 31)});
new Coupon({issuer: "Best Buy", value: "15% Best Buy", promoCode: "AJGD51", expirationDate: new Date(2014, 0, 31)});
new Coupon({issuer: "That's Showbiz", value: "Buy 2 Get 1 Free", promoCode: "ZHYF23", expirationDate: new Date(2014, 3, 26)});
