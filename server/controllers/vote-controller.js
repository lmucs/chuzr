Vote = require('../models/vote')

module.exports = function (app) {

  function validateVoteId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };

  app.get('/votes', function (req, res) {
    var parameterFlag = false,
        votes = [],
        votesByUserId = [],
        votesByProductId = [],
        skip = +req.query.skip || 0,
        limit = +req.query.limit || 10;

    if (req.query.userId) {
      //TODO add limit to findByUser
      votesByUserId = Vote.findByUser(req.query.userId);
      parameterFlag = true;
    }
    if (req.query.productId) {
      votesByProductId = Vote.findByProduct(req.query.productId);
      parameterFlag = true;
    }
    if (!parameterFlag) {
      return res.json(Vote.findAll(skip=skip, limit=limit));
    }
    
    if (req.query.userId && req.query.productId) {
      votes = Vote.arrayIntersection(votesByUserId, votesByProductId);
    }
    else {
      votes.push.apply(votes, votesByProductId);
      votes.push.apply(votes, votesByUserId);
    }
    return res.json(votes.slice(0, limit));
  });

  app.post('/votes', function (req, res) {
    //res.send('Creating a vote');
    var vote = new Vote(req.body);
    return res.send(201, vote);
  });

  // Get a vote by its id
  app.get('/votes/:id', function (req, res) {
    id = validateVoteId(req.params.id);
    try {
      res.json(Vote.findById(id));
    } catch (e) {
      if (e == Vote.NO_SUCH_VOTE) {
        res.send(400, 'No such vote');
      } else {
        throw e;
      }     
    }
  });

  app.put('/votes/:id', function (req, res) {
    var id = validateVoteId(req.params.id),
        vote = Vote.findById(id);
    return res.send(vote);
  });

  app.delete('/votes/:id', function (req, res) {
    var id = validateVoteId(req.params.id),
        vote = Vote.findById(id);
    Vote.delete(id);
    res.send("Vote Deleted");
    /*
    return vote.remove(function (error) {
      if (!error) {
        return res.send("Vote removed");
      } else {
        res.send(error);
      }
    });
    */
  });
};
