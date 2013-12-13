module.exports = function (app) {

  app.get('/', function(req, res) {
    if (req.session.userInfo) {
      res.redirect('/home');
    } else {
      res.render('login', {title: 'Login'});
    }
  });
  
  app.get('/home', function(req, res) {
    res.render('index', {title: 'Chuzr Home'});
  });

  app.get('/signup', function(req, res) {
    res.render('signup', {title: 'Sign up'});
  });

  app.get('/play', function(req, res) {
    res.render('play-home', {title: 'Play'});
  });

  app.get('/social', function(req, res) {
    res.render('social-home', {title: 'Social'});
  });
  
  app.get('/browse', function(req, res) {
    res.render('browse-home', {title: 'Browse'});
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

  app.get('/chuzoff', function(req, res) {
    res.render('chuzoff', {title: 'The ChuzOff'});
  });

  app.get('/rateme', function(req, res) {
    res.render('rateme', {title: 'Rate Me'});
  });

  app.get('/rateme/:id', function(req, res) {
    res.render('rateme', {title: 'Rate Me', id: req.params.id});
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

  app.get('/game', function(req, res) {
    res.render('game', {title: 'The Super Awesome Game'});
  });

  app.get('/product/:id', function(req, res) {
    res.render('product', {title: 'Product Profile', id: req.params.id});
  });

  app.get('/categorygame', function(req, res) {
    res.render('categoryGame', {title: 'Chuz where they Go'});
  });

  app.get('/updowngame', function(req, res) {
    res.render('upDownGame', {title: 'Chuz Up or Down'});
  });
}
