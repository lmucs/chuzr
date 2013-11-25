var assert = require('assert'),
    massager = require('../massager'),
    shopzillaObjectGet = require('./testObjects/shopzillaGet'),
    chuzrProducts = require('./testObjects/chuzrProducts')
    
   console.log(chuzrProducts); 
describe('chuzrProducts', function () {

  describe('#massage', function () {

    it('should massage a shopzillaObject into chuzrProduct', function () {
      assert.equal(JSON.stringify(chuzrProducts), JSON.stringify(massager.massageProduct(shopzillaObjectGet)));
    })

  });

});
