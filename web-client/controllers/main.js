module.exports = function (app) {

  app.get('/', function(req, res) {
    res.render('login', {title: 'Login'});
  });
  
  app.get('/home', function(req, res) {
    res.render('index', {title: 'Chuzr Home'});
  });

  app.get('/play', function(req, res) {
    res.render('play-home', {title: 'Play'});
  });

  app.get('/social', function(req, res) {
    res.render('social-home', {title: 'Social'});
  });
  
  app.get('/browse', function(req, res) {
    res.render('browse-home', {title: 'Browse Chuzr'});
  });

  app.get('/stuff', function(req, res) {
    res.render('stuff-home', {title: 'Chuzr Stuff'});
  });

  app.get('/trends', function(req, res) {
    res.render('trends', {title: 'Trends'});
  });

  app.get('/profile', function(req, res) {
    res.render('profile', {title: 'profile'});
  });

  app.get('/settings', function(req, res) {
    res.render('settings', {title: 'Settings'});
  });
  
  app.get('/logout', function(req, res) {
    res.render('logout', {title: 'Logout'});
  });
  
  app.get('/contact', function(req, res) {
    res.render('contact', {title: 'Contact'});
  });

  app.get('/about', function(req, res) {
    res.render('about', {title: 'About Chuzr'});
  });

  app.get('/FAQ', function(req, res) {
    res.render('FAQ', {title: 'FAQ'});
  });
  
  app.get('/feedback', function(req, res) {
    res.render('feedback', {title: 'Feedback'});
  });

  app.get('/privacy', function(req, res) {
    res.render('privacy', {title: 'Privacy'});
  });
}
