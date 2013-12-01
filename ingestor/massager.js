var Massager = function () {

    var _products = function (shopzillaObject) {
      var chuzrProducts = [];
      if (shopzillaObject) {
        var shopzillaProducts = shopzillaObject.products.product;
        for (var p = 0; p < shopzillaProducts.length; p++) {
            var biggestImage = shopzillaProducts[p].images.image.length-1;
            var chuzrProduct =  {
                "name" : shopzillaProducts[p].title,
                "brand" : shopzillaProducts[p].brand.name,
                "description" : shopzillaProducts[p].description,
                "image" : (biggestImageIndex >= 0) ? shopzillaProducts[p].images.image[biggestImage].value : null,
                "url" : shopzillaProducts[p].url.value,
                "price" : {
                    "max" : (shopzillaProducts[p].priceSet) ? (shopzillaProducts[p].priceSet.maxPrice.value) : (shopzillaProducts[p].price.value),
                    "min" : (shopzillaProducts[p].priceSet) ? (shopzillaProducts[p].priceSet.minPrice.value) : (shopzillaProducts[p].price.value)
                },
                "shopzillaId" : shopzillaProducts[p].id,
                "categoryId" : shopzillaProducts[p].categoryId
            };
            chuzrProducts.push(chuzrProduct);
        };
      }
      return chuzrProducts;
  };

    var _taxonomy = function (taxonomyTree) {
      return taxonomyTree;
    };

    return {
      products: _products,
      taxonomy: _taxonomy
    };

}();

module.exports = Massager;
