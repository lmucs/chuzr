Vote = require('../models/vote')

module.exports = function (app) {

  function validateVoteId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id');
    }
    return id;
  };

  app.get('/votes', function (req, res) {
    if (req.query.userId) {
      //TODO add limit to findByUser
      res.json(Vote.findByUser(req.query.userId));
      return;
    } else if (req.query.productId) {
        res.json(Vote.findByProduct(req.query.productId));
        return;
    }
    console.log("Status Code: ", res.statusCode);
    skip = +req.query.skip || 0;
    limit = +req.query.limit || 10;
    console.log('skip = %d, limit = %d', skip, limit);
    res.json(Vote.findAll(skip=skip, limit=limit));
  });

  app.post('/votes', function (req, res) {
    //res.send('Creating a vote');
    var vote = new Vote();
    //Assuming we are using the mongoose model.js
    vote.save(function (error) {
        if (!error) {
            return res.send("vote added");
        } else {
            return res.send(error);
        }
        });
        return res.send(vote);
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
    return vote.save(function (error) {
      if (!error) {
        res.send("Vote updated");
      } else {
        res.send(error);
      }
    });
    return res.send(vote);
  });

  app.delete('votes/:id', function (req, res) {
    var id = validateVoteId(req.params.id),
      vote = Vote.findById(id);
    return vote.remove(function (error) {
      if (!error) {
        return res.send("Vote removed");
      } else {
        res.send(error);
      }
    });
  });
};
