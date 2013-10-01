var VALID_PROPERTIES = [
  'loginName', 'displayName', 'reputation'
];

function validateUserData (userData) {
  // TODO
}

module.exports = User = function (userData) {
    this.id = maxId++;
    this.dateJoined = new Date();
    validateUserData(userData);

    VALID_PROPERTIES.forEach(function (property) {
      if (property in userData) {
        this[property] = userData[property];
      }
    }, this);
    
    // For now, store it in mock data, later use MongoDB
    mockUsers.push(this);
}

Object.defineProperty(User, 'NO_SUCH_USER', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: {}
});

User.findAll = function (skip, limit) {
    return mockUsers.slice(skip, skip + limit);
}

//Mongoose has a built in findById function
User.findById = function (id) {
    // HAHA OBVIOUSLY THIS IS NOT THE REAL FINAL CODE
    for (var i = 0; i < mockUsers.length; i++) {
        if (+id === mockUsers[i].id) {
            return mockUsers[i];
        }
    }
    throw User.NO_SUCH_USER;
}

User.prototype.save = function (id, userData) {

}

User.delete = function (id) {
    return mockUsers.splice(id, 1);
}

// Use fake storage until a database is in place
var mockUsers = [];
var maxId = 0;

// Get rid of this stuff later -- actually move it into test
new User({loginName: "alice", displayName: "Alice Cooper", reputation: 100});
new User({loginName: "bob", displayName: "Uncle Bob Martin", reputation: 200});
new User({loginName: "cassandra", displayName: "The Real Cassandra", reputation: 300});
new User({loginName: "daisy", displayName: "Daisy Chain", reputation: 400});
