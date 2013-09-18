// This currently uses a mock users array just to get things up and running.
// Students will need to replace this with a real MongoDB.

var VALID_PROPERTIES = [
  'loginName', 'displayName', 'passwordHash', 'profile', 
  'reputation'
];

function validateUserData(userData) {
  // throw exception if something is bad
  // Students will implement
}

module.exports = User = function (userData) {
  // validateUserData(userData);
  // VALID_PROPERTIES.forEach(function (property) {
  //   if (property in userData) {
  //     this[property] = userData[property];
  //   }
  // }, this);
  this.id = maxId++;
  mockUsers.push(this);
};

Object.defineProperty(User, 'NO_SUCH_USER', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {}
});

User.findAll = function (skip, limit) {
    // TODO - limit clamp
    return mockUsers.slice(skip, skip + limit);
};

User.findById = function (id) {
    // HAHA OBVIOUSLY THIS IS NOT THE REAL FINAL CODE
    for (var i = 0; i < mockUsers.length; i++) {
        if (+id === mockUsers[i].id) {
            console.log("found %s id", id)
            return mockUsers[i];
        }
    }
    console.log("darn")
    throw User.NO_SUCH_USER;
};

User.prototype.save = function (id, userData) {

};

User.prototype.delete = function (id) {
    
};

// TODO Stuff that belongs in test.
var mockUsers = [];
var maxId = 0;

new User({
  loginName: "alice", 
  displayName: "Alice Cooper",
  passwordHash: "3948rh3498fh3498h",
  profile: {interests: ["music", "out of school"], sex: "M"},
  reputation: 100
});

new User({
  loginName: "bob", 
  displayName: "Bob Martin",
  passwordHash: "3948rh4njrfh3498h",
  profile: {interests: ["clean code", "sushi chef"], sex: "M"},
  reputation: 10000000
});

new User({
  loginName: "cassandra", 
  displayName: "Cassandra Cooper",
  passwordHash: "1111rh4njrfh3498h",
  profile: {interests: [], sex: "F"},
  reputation: 1099999
});

new User({
  loginName: "dusty", 
  displayName: "Dusty Street",
  passwordHash: "11441q4njrfh3498h",
  profile: {interests: ["music", "cars"], sex: "F"},
  reputation: 109
});
