// This script inserts sample data.

var argv = require('optimist')
  .usage('Usage: node $0 --baseurl <apiroot> --user <apiuser> --pass <apipass>')
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
  request.post({url: url, json: data}, function (err, res, body) {
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
  request.post({url: url, json: data}, function (err, res, body) {
    if (err) throw err;
    console.log('Adding coupon, HTTP response: %d / %j', res.statusCode, body);
  });
}
