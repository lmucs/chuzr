User = require('../models/user')

console.log("HI FROM THE USER CONTROLLER");
console.log(typeof(User.findById))

module.exports = function (app) {

  // TODO: Needs to be an HTTP 400 eventually.  Actually consider middleware validator.
  function validateId(id) {
    if (/\D/.test(id)) {
      throw Error('Illegal id')
    }
    return id
  }

  app.get('/users', function (req, res) {
    console.log(Object.keys(User))
    console.log(User.findAll)
    console.log(User.findAll.length)
    console.log(User.findAll(0, 5))
    res.json(User.findAll(0, 100))
  })

  app.post('/users', function (req, res) {
  })

  app.get('/users/:id', function (req, res) {
    console.log('Getting user')
    id = +validateId(req.params.id);
    try {
      console.log('Okay so far')
      console.log(typeof(id))
      o = User.findAll(0, 3)
      console.log("found")
      console.log(JSON.stringify(o));
      console.log("---")
      res.json(o);
    } catch (e) {
      console.log(e == User.NO_SUCH_USER)
      if (e == User.NO_SUCH_USER) {
        res.send(400, 'No such user');
      } else {
        throw e;
      }     
    }
  })

  app.put('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Updating user ' + id);
  })

  app.delete('/users/:id', function (req, res) {
    id = validateId(req.params.id)
    res.send('Deleting user ' + id);
  })
}

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

u = new User({
  loginName: "dusty", 
  displayName: "Dusty Street",
  passwordHash: "11441q4njrfh3498h",
  profile: {interests: ["music", "cars"], sex: "F"},
  reputation: 109
});

console.log(User.findAll(0, 4))

for (p in u) {console.log(p)}

