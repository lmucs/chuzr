// This script inserts sample users.

var argv = require('optimist')
  .usage('Usage: node $0 --url <apiroot> --user <apiuser> --pass <apipass>')
  .demand(['user', 'pass'])
  .argv;

var request = require('request');

var url = (argv.url || 'http://localhost:3000') + '/users';
var auth = {user: argv.user, pass: argv.pass};

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
    repuation: Math.floor(Math.pow(1.3, Math.random() * 40)),
    socialHandles: 'http://www/facebook.com/' + i,
    dateOfBirth: new Date(Math.random() * 1000000000000),
    isAdmin: i === 0
  };
  request.post({url: url, auth: auth, json: data}, function (err, res, body) {
    if (err) throw err;
    console.log(res.statusCode);
  });
});
