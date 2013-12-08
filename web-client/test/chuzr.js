
process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var assert = require('assert');
var url = 'http://localhost:3001/';

browser = new Browser();

describe('Login page', function () {
  before(function (done) {
    browser.visit(url, function () {
      done();
    });
  });

  it('should contain correct elements', function () {
    assert.ok(browser.query("#login"));
    assert.ok(browser.query("#main-content"));
  });
  
  it('title should equal "Login"', function () {
    assert.equal(browser.text("title"), "Login");
  });

  after(function () {
     browser.close();
  });
});