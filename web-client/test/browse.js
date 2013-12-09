process.env.NODE_ENV = 'test';

var assert = require('assert');
var Browser = require('zombie');
var url = 'http://localhost:3001/browse';

browser = new Browser();
 
describe('Browse page', function () {
  before(function (done) {
    browser.visit(url, function () {
      done();
    });
  });
  
  it('title should equal "Browse"', function () {
    assert.equal(browser.text("title"), "Browse");
  });
  
  it('should contain correct elements', function () {
    assert.ok(browser.success);
    assert.ok(browser.query("#search-menu"));
    assert.ok(browser.query("#prependDropdownButton"));
    assert.ok(browser.query("#find-products"));

  });
 
  after(function() {
    browser.close();
  });
 
});
