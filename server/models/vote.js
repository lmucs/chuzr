/*var voteSchema = new mongoose.Schema({
  _id: Number,
  productId: Number,
  userId: Number,
  rating: {type: Number, min: 0, max: 10}
});*/

module.exports = Vote = function (voteData) {
    this.id = maxId++;
    this.timeStamp = new Date();
    this.userId = voteData.userId;
    //this.productId = voteData.userId;
    //validateUserData(userData);

    /*VALID_PROPERTIES.forEach(function (property) {
      if (property in userData) {
        this[property] = userData[property];
      }
    }, this);*/
    
    // For now, store it in mock data, later use MongoDB
    mockVotes.push(this);
};

Object.defineProperty(Vote, 'NO_SUCH_VOTE', {
    configurable: false,
    enumerable: false,
    writable: false,
    value: {}
});

Vote.findById = function (id) {
    // HAHA OBVIOUSLY THIS IS NOT THE REAL FINAL CODE
    for (var i = 0; i < mockVotes.length; i++) {
        if (+id === mockVotes[i].id) {
            return mockVotes[i];
        }
    }
    throw Vote.NO_SUCH_VOTE;
}

Vote.findByUser = function (userId) {
    console.log("in find by user id");
    var votes = [];
    for (var i = 0; i < mockVotes.length; i++) {
      console.log("userId", userId, "mockVotes", mockVotes[i].userId);
        if (+userId === mockVotes[i].userId) {
          console.log("in if");
            votes.push(mockVotes[i]);
        }
    }
    //TODO: throw error if user doesn't exist or if that user doesn't have any votes
    return votes;
}

Vote.findAll = function (skip, limit) {
    return mockVotes.slice(skip, skip + limit);
}

var mockVotes = [];
var maxId = 0;

new Vote({userId: 1});
new Vote({userId: 2});
