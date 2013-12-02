var assert = require('assert'),
    massage = require('../massager'),
    shopzillaProducts = require('./testObjects/shopzillaProducts');

describe('Massager', function () {

  describe('#image', function () {

    it('should return an empty object if there are no shopzilla images', function () {
      var shopzillaImageObjectOne = { "image" : [] },
          shopzillaImageObjectTwo = {},
          shopzillaImageObjectThree = undefined;
      assert.deepEqual({}, massage.images(shopzillaImageObjectOne));
      assert.deepEqual({}, massage.images(shopzillaImageObjectTwo));
      assert.deepEqual({}, massage.images(shopzillaImageObjectThree));
    });

    it('should return a dictionary of image urls with the dimension as the key', function () {
      var shopzillaImageObjectOne = {
        "image" : [
          {
            "value" : "http://apiimg03.bizrate.com/resize?sq=60&uid=5333137318&kw=shoes",
            "xsize" : 60,
            "ysize" : 60
          },
          {
            "value" : "http://apiimg03.bizrate.com/resize?sq=100&uid=5333137318&kw=shoes",
            "xsize" : 100,
            "ysize" : 100
          },
          {
            "value" : "http://apiimg03.bizrate.com/resize?sq=160&uid=5333137318&kw=shoes",
            "xsize" : 160,
            "ysize" : 160
          },
          {
            "value" : "http://apiimg03.bizrate.com/resize?sq=400&uid=5333137318&kw=shoes",
            "xsize" : 400,
            "ysize" : 400
          }
        ]
      };
      assert.deepEqual({
        400: "http://apiimg03.bizrate.com/resize?sq=400&uid=5333137318&kw=shoes",
        160: "http://apiimg03.bizrate.com/resize?sq=160&uid=5333137318&kw=shoes",
        100: "http://apiimg03.bizrate.com/resize?sq=100&uid=5333137318&kw=shoes",
        60: "http://apiimg03.bizrate.com/resize?sq=60&uid=5333137318&kw=shoes"
      },
      massage.images(shopzillaImageObjectOne));

    });

  });

  describe('#product', function () {

    it('should return a chuzr product', function () {
      var shopzillaProduct = {
        "title": "title",
        "brand" : { "name": "brand name" },
        "description" : "description stuff",
        "images" : {
          "image" : [
            {
              "value" : "http://apiimg03.bizrate.com/resize?sq=60&uid=5333137318&kw=shoes",
              "xsize" : 60,
              "ysize" : 60
            }
          ]
        },
        "url" : { "value" : "a value" },
        "priceSet" : {
          "minPrice" : { "value" : "$48.99" },
          "maxPrice" : { "value" : "$55.99" }
        },
        "id" : 10
      },
      category = {
        "id": 1,
        "name" : "shoes"
      },
      chuzrProduct = {
        "name" : shopzillaProduct.title,
        "brand" : shopzillaProduct.brand.name,
        "description" : shopzillaProduct.description,
        "images" : {
          60: "http://apiimg03.bizrate.com/resize?sq=60&uid=5333137318&kw=shoes"
        },
        "url" : shopzillaProduct.url.value,
        "price" : {
            "max" : shopzillaProduct.priceSet.maxPrice.value,
            "min" : shopzillaProduct.priceSet.minPrice.value
        },
        "shopzillaId" : shopzillaProduct.id,
        "category" : category
      };

      assert.deepEqual(chuzrProduct, massage.product(shopzillaProduct, category));
    });

  });

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

    it('should return the taxonomy exactly the same', function () {
      var fakeTaxonomy = { "categories" : [
        { "id" : 1, "name" : "shoes" },
        { "id" : 2, "name" : "dresses" },
        { "id" : 3, "name" : "handbags" }
      ]};
      var results = massage.taxonomy(fakeTaxonomy);
      assert.equal(results, fakeTaxonomy);
    });

  });

});
