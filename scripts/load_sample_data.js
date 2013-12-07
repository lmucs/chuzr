// This script inserts sample data.

var argv = require('optimist')
  .usage('Usage: node $0 --baseurl <apiroot> --user <apiuser> --pass <apipass>')
  .demand(['user', 'pass'])
  .argv;

var request = require('request');

var baseurl = (argv.baseurl || 'http://localhost:3000');
var auth = {user: argv.user, pass: argv.pass};

var randomInt = function (low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function choice(s) {
  var choices = s.split('|');
  return choices[randomInt(0, choices.length)];
}

var userData = [
  "Thomas|Costello|thomas@costello.com|tcostello|p0li%sci&ftw|www.avatarworld.com/tcostello.jpg",
  "Stephen|O'Brien|sbrien@irishluvr.net|irishboy94|eqtuiosgdh|www.avatarworld.com/sobrien.jpg",
  "Peter|Powers|ppowers@gmail.com|pdangerpowers|12345678|www.avatarworld.com/ppowers.jpg",
  "John|Smith|john.smith@sbcglobal.net|johnsmith|sagjweo|www.avatarworld.com/jsmith.jpg",
  "Elizabeth|Bush|ebush@yahoo.com|berrybush|1234ghsdgkj|www.avatarworld.com/ebush.jpg",
  "Kevin|Jones|kjones@aol.com|kevin|vnlqe84|www.avatarworld.com/kjones.jpg",
  "Aloyse|Draculata|adracula@ivantblud.com|hungarianvampire|vns428g0|www.avatarworld.com/adraculata.jpg",
  "Anna|Gacs|agacs@chuzr.com|marikafern|password|www.avatarworld.com/agacs.jpg|",
  "Marika|Fernandez|mfernandez@gmail.com|barkwoofgrowl|jjjfff99352sjdkl|www.avatarworld.com/mfern.jpg",
  "Mojo|Dogson|mdog@squirrels.net|mdoge|correcthorsebatterystaple|www.avatarworld.com/dog.jpg"
];

userData.forEach(function (s, i) {
  user = s.split('|')
  var data = {
    name: {first: user[0], last: user[1]},
    email: user[2],
    login: user[3],
    hashedPassword: user[4],
    avatarURL: user[5],
    reputation: Math.floor(Math.pow(1.3, Math.random() * 40)),
    socialHandles: 'http://www/facebook.com/' + i,
    dateOfBirth: new Date(Math.random() * 1000000000000),
    isAdmin: i === 0
  };
  url = baseurl + '/users';
  request.post({url: url, auth: auth, json: data}, function (err, res, body) {
    if (err) throw err;
    console.log('Adding user %s, HTTP response: %d', data.login, res.statusCode);
  });
});

var couponOptions = {
  issuers: "Target|Best Buy|Ralphs|Game Stop|iTunes|Vans|Footlocker|Macy's|Ross",
  values: "10% off|20% off|50% off|Gift with purchase|Buy one get one free|Buy 2 get 1 free",
  promoCodes: "ABC123|HKG9682|O3UYG845P|FUT865|IDY360|asdfasdfasdf",
  images: "3TN7PaF",
};

for (var i = 0; i < 500; i++) {
  var data = {
    issuer: choice(couponOptions.issuers),
    value: choice(couponOptions.values),
    promoCode: choice(couponOptions.promoCodes),
    expirationDate: new Date(Date.now() + randomInt(-1E12, 1E12)),
    imageURL: 'http://i.imgur.com' + choice(couponOptions.images) + '.png'
  }
  url = baseurl + '/coupons';
  request.post({url: url, auth: auth, json: data}, function (err, res, body) {
    if (err) throw err;
    console.log('Adding coupon, HTTP response: %d / %j', res.statusCode, body);
  });
}

var productInfo = {
  names: [
    "Red Ball", 
    "Basketball", 
    "Golf Club Set", 
    "Silly Putty", 
    "Dark Chocolate with Hazelnuts"
  ],
  brands: ["Target", "Spalding", "GolfPro", "Mattel", "Nestle Tollhouse"],
  descriptions: [
    "This ball bounces higher than any before it!", 
    "Play like a pro with this NBA-standard basketball", 
    "The set used by Tiger Woods", 
    "There is nothign silly about the quality of this stuff!", 
    "Roasted hazelnuts mixed with smooth and delicate dark chocolate"  
  ],
  images: [
    {
      fourHundred: "http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/redball.jpg", 
      oneSixty: "http://i.reddit.com/42.png"
    }, 
    {
      fourHundred: "http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/sampleiamge2.jpg"
    },
    {
      fourHundred: "http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/golfclubset.jpg", 
      oneSixty: "http://i.reddit.com/42.png"
    }, 
    {
      fourHundred: "http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/sillyputty.jpg",
      oneSixty: "http://i.thoughtcatalog.com/12.png"
    },
    {
      fourHundred: "http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/dkchoc.jpg", 
      oneSixty: "http://i.reddit.com/42.png"
    }, 
    {
      fourHundred: "http://i.facebook.com/332.png", 
      oneSixty: "http://i.thoughtcatalog.com/12.png"
    }
  ],
  urls: [
    "http://www.google.com/products/best_product.html", 
    "http://www.google.com/products/best_product.html",
    "http://www.ebay.com/products/product.html",
    "http://www.amazon.com/product.html", 
    "http://shopzilla.com/products/favorite_product.html"
  ],
  ratings: [1, 9, 7, 5, 10],
  minprices: [0.99, 1.00, 7.80, 5.95, 14.32],
  maxprices: [100, 60.45, 30, 75, 80],
  related: [[12643, 53342, 23566, 234453], [1, 346, 876], [98, 234, 65, 333, 23, 6]],
  shopzillaIds: [12345, 6345234, 2345, 24, 22],
  categoryIds: [77, 245, 2458475, 23423, 2222],
};

for (var i = 0; i < 5; i++) {
  var data = {
    name: productInfo.names[i], 
    brand: productInfo.brands[i], 
    description: productInfo.descriptions[i], 
    images: productInfo.images[i],
    url: productInfo.urls[i],
    rating: productInfo.ratings[i], 
    price: {max: productInfo.maxprices[i], min: productInfo.minprices[i]}, 
    shopzillaId: productInfo.shopzillaIds[i],
    categoryId: productInfo.categoryIds[i], 
    related: productInfo.related[randomInt(3)]
  }
  url = baseurl + '/products';
  request.post({url: url, auth: auth, json: data}, function (err, res, body) {
    if (err) throw err;
    console.log('Adding product, HTTP response: %d / %j', res.statusCode, body);
  });
}




