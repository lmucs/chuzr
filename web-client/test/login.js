process.env.NODE_ENV = 'test';

var assert = require('assert');
var Browser = require('zombie');
var url = 'http://localhost:3001';

browser = new Browser();
 
describe('Login page', function () {
  before(function (done) {
    browser.visit(url, function () {
      done();
    });
  });
  
  it('title should equal "Login"', function () {
    assert.equal(browser.text("title"), "Login");
  });
  
  it('should contain correct elements', function () {
    assert.ok(browser.success);
    assert.ok(browser.query("#login"));
    assert.ok(browser.query("#main-content"));

  });
 
  it('should show a login form', function() {
    assert.ok(browser.success);
    assert.ok(browser.query("#inputEmail"));
    assert.ok(browser.query("#inputPassword"));
    assert.equal(browser.text('h3'), 'Sign-inSign up');
  });
 
  it('should refuse empty submissions', function(done) {
    browser.pressButton('Sign In').then(function() {
      assert.ok(browser.success);
      assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
    }).then(done, done);
  });
 
  it('should refuse partial submissions', function(done) {
    browser.fill("#inputEmail", 'testmail@test.com');
    browser.pressButton("#signin").then(function() {
      assert.ok(browser.success);
      assert.equal(browser.text('div.alert'), 'Please fill in all the fields');
    }).then(done, done);
  });
 
  it('should keep values on partial submissions', function(done) {
    browser.fill("#inputEmail", 'testmail@test.com');
    browser.pressButton("#signin").then(function() {
      assert.equal(browser.field("#inputEmail").value, 'testmail@test.com');
    }).then(done, done);
  });
 
  it('should accept complete submissions', function(done) {
    browser.fill("#inputEmail", 'testmail@test.com');
    browser.fill("#inputPassword", 'awesomepassword123');
    browser.pressButton("#signin").then(function() {
      assert.ok(browser.success);
    }).then(done, done);
  });
 
  after(function() {
    browser.close();
  });
 
});
