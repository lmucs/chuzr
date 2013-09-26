module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('index', {title: 'Chuzr'});
  });
  
  app.get('/login', function(req, res) {
    res.render('login', {title: 'Login'});
  });
  
}
