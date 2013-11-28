var Massager = function () {

    var _products = function (shopzillaObject) {
      var chuzrProducts = "";
      if (shopzillaObject) {
        var productArray = shopzillaObject.products.product;
        for (var p = 0; p < productArray.length; p++) {
            var biggestImage = productArray[p].images.image.length-1;
            var chuzrProduct =  {
                "name" : productArray[p].title,
                "brand" : productArray[p].brand.name,
                "description" : productArray[p].description,
                "image" : (biggestImageIndex >= 0) ? productArray[p].images.image[biggestImage].value : null,
                "url" : productArray[p].url.value,
                "price" : {
                    "max" : (productArray[p].priceSet) ? (productArray[p].priceSet.maxPrice.value) : (productArray[p].price.value),
                    "min" : (productArray[p].priceSet) ? (productArray[p].priceSet.minPrice.value) : (productArray[p].price.value)
                },
                "shopzillaId" : productArray[p].id,
                "categoryId" : productArray[p].categoryId
            };
            chuzrProducts = chuzrProducts + "db.products.insert(" + JSON.stringify(chuzrProduct) + ");";
        };
      }
      return chuzrProducts;
  };

    var _taxonomy = function (taxonomyTree) {
      return 'db.taxonomy.insert(' + JSON.stringify(taxonomyTree) + ');';
    };

    return {
      products: _products,
      taxonomy: _taxonomy
    };

}();

module.exports = Massager;
