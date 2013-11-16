use chuzr_dev
var issuers = ["Target", "Best Buy", "Ralphs", "Game Stop", "Bath and Body Works", "Apple", "Google", "iTunes", "Vans", "Footlocker"]
var values = ["10% off", "20% off", "30% off", "40% off", "50% off", "60% off", "70% off", "80% off", "Buy one get one free", "Buy 2 get 1 free"]
var promoCodes = ["ABC123", "HKG968", "DIU457", "OYG845", "FUT865", "IDY360", "KFG079", "LFY465", "LIF865", "KJD067"]
var expirationDates = [new Date(2014, 1, 15), new Date(2012, 4, 23), new Date (2014, 0, 31), new Date (2015, 3, 3), new Date (2013, 11, 30)]
var imageURLs = ["http://i.google.com/12.png", "http://i.reddit.com/42.png", "http://i.facebook.com/332.png", "http://i.thoughtcatalog.com/12.png"]

var rand = function (x) {
  return Math.floor(Math.random() * x)
}

for (i = 0; i < 1000; i++) {
  var coupon = {"issuer": issuers[rand(10)], "value": values[rand(10)], "promoCode": promoCodes[rand(10)], "expirationDate": expirationDates[rand(5)], "imageURL": imageURLs[rand(4)]};
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/coupons",
    data: p
  });
}
