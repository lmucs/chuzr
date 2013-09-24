var VALID_PROPERTIES = [
  'userId', 'productId', 'rating'
];

function validateVoteData (voteData) {
  // TODO
}

module.exports = Vote = function (voteData) {
    this.id = maxId++;
    this.timeStamp = new Date();
    validateVoteData(voteData);

    VALID_PROPERTIES.forEach(function (property) {
      if (property in voteData) {
        this[property] = voteData[property];
      }
    }, this);
    
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
    var votes = [];
    for (var i = 0; i < mockVotes.length; i++) {
        if (+userId === mockVotes[i].userId) {
            votes.push(mockVotes[i]);
        }
    }
    //TODO: throw error if user doesn't exist or if that user doesn't have any votes
    return votes;
}

Vote.findByProduct = function (productId) {
  var votes = [];
  console.log("in find by product");
  for (var i = 0; i < mockVotes.length; i++) {
    if (+productId === mockVotes[i].productId) {
      votes.push(mockVotes[i]);
    }
  }
  //TODO: throw error if product doesn't exist or if that product doesn't have any votes
  return votes;
}

Vote.findAll = function (skip, limit) {
    return mockVotes.slice(skip, skip + limit);
}

var mockVotes = [];
var maxId = 0;

new Vote({productId: 2, userId: 1, rating: 3});
new Vote({productId: 2, userId: 3, rating: 8});
new Vote({productId: 44, userId: 1, rating: 9});
