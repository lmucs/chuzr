// This currently uses a mock users array just to get things up and running.
// Students will need to replace this with a real MongoDB.

module.exports = User = function (name) {
    this.id = maxId++;
    this.name = name;
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

new User("alice");
new User("bob");
new User("cassandra");
new User("dinh");
