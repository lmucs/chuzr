var assert = require('assert'),
    massage = require('../massager');

describe('Massager', function () {

  describe('#taxonomy', function () {

    it('should return the string that will load the taxonomy into the database', function () {
      var fakeTaxonomy = { "categories" : [
        { "id" : 1, "name" : "shoes" },
        { "id" : 2, "name" : "dresses" },
        { "id" : 3, "name" : "handbags" }
      ]};
      var results = massage.taxonomy(fakeTaxonomy);
      assert.equal(
        'db.taxonomy.insert(' + JSON.stringify(fakeTaxonomy) + ');',
        results
      );
    });

  });

});
