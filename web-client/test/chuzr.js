
process.env.NODE_ENV = 'test';

var Browser = require('zombie');
var assert = require('assert');
var url = require('../config/webConfig').test.url;
var testUrl = 'http://localhost:3001/';

browser = new Browser();

describe('Login page', function () {
  before(function (done) {
    browser.visit(testUrl, function () {
      done();
    });
  });

  it('should contain correct elements', function () {
    assert.ok(browser.query("#login"));
    assert.ok(browser.query("#main-content"));
    assert.ok(browser.query("#login"));
  });
  
  it('title should equal "Login"', function () {
    assert.equal(browser.text("title"), "Login");
  });
  
  it('should contain login form', function () {
    //does nothing yet
  });

  after(function () {
     browser.close();
  });
});
