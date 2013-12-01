var assert = require('assert'),
    massage = require('../massager'),
    shopzillaProducts = require('./testObjects/shopzillaProducts');

describe('Massager', function () {

  // describe('#products', function () {

  //   it('should return an empty string when the query returns nothing', function () {
  //     assert.equal("", massage.products(undefined));
  //   });

  //   it('should return a string of chuzr-style product loading commands', function () {
  //     var commands = "";
  //     assert.equal(commands, massage.products(shopzillaProducts));
  //   });

  // });

  describe('#taxonomy', function () {

    it('should return the string that will load the taxonomy into the database', function () {
      var fakeTaxonomy = { "categories" : [
        { "id" : 1, "name" : "shoes" },
        { "id" : 2, "name" : "dresses" },
        { "id" : 3, "name" : "handbags" }
      ]};
      var results = massage.taxonomy(fakeTaxonomy);
      assert.equal(
        results,
       'db.taxonomy.insert(' + JSON.stringify(fakeTaxonomy) + ');'
      );
   });

  });

});
