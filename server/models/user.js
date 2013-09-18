// This currently uses a mock users array just to get things up and running.
// Students will need to replace this with a real MongoDB.

var mockUsers = [];
var maxId = 0;

var VALID_PROPERTIES = [
  'loginName', 'displayName', 'passwordHash', 'profile', 
  'reputation'
];

function validateUserData(userData) {
  // throw exception if something is bad
  // Students will implement
}

function User(userData) {
  validateUserData(userData);
  VALID_PROPERTIES.forEach(function (property) {
    if (property in userData) {
      this[property] = userData[property];
    }
  }, this);
  this.id = maxId++;
  mockUsers.push(this);
  console.log(mockUsers)
};

Object.defineProperty(User, 'NO_SUCH_USER', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {}
});

console.log('sdgsdgsdgsdgsdgsdgsdgsdgsd')
User.gh = function (x) {return 1};

User.findAll = function (skip, limit) {
    // TODO - limit clamp
    //return mockUsers.slice(skip, skip + limit);
    console.log("dddddd")
    console.log(mockUsers.length)
    return [4, 5, 6, 9]
};

User.findById = function (id) {
    // HAHA OBVIOUSLY THIS IS NOT THE REAL FINAL CODE
    console.log("WOOOOOOOOOO")
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

console.log("HI FROM THE USER MODULE");

module.exports = User;


