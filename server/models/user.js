// This currently uses a mock users array just to get things up and running.
// Students will need to replace this with a real MongoDB.

module.exports = User = function (userData) {
    this.id = maxId++;
    // TODO - MUST VALIDATE userData
    if ('name' in userData) this.name = userData.name;
    if ('reputation' in userData) this.reputation = userData.reputation;
    this.dateJoined = new Date();
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

User.prototype.delete = function (id) {
    
}

var mockUsers = [];
var maxId = 0;

// HACK: ADD SOME USERS TO "PRIME THE APP"
// Get rid of this stuff later -- actually move it into test
new User({name: "alice", reputation: 100});
new User({name: "bob", reputation: 200});
new User({name: "cassandra", reputation: 300});
new User({name: "dinh", reputation: 400});
