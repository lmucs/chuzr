// This currently uses a mock coupons array just to get things up and running.
// Students will need to replace this with a real MongoDB.

module.exports = Coupon = function (name, dateExpires) {
    this.id = maxId++;
    this.name = name;
    this.dateJoined = new Date();
	this.dateExpires = dateExpires;
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
    throw Coupon.NO_SUCH_Coupon;
}

Coupon.prototype.save = function (id, couponData) {

}

Coupon.prototype.delete = function (id) {
    
}

var mockCoupons = [];
var maxId = 0;

new Coupon("Free TV");
new Coupon("30% off Wii-U");
new Coupon("15% Best Buy");
new Coupon("Buy 2 get 1 Free");