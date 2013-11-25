var Massager = function () {

    var _massageProduct = function (shopzillaObject) {
        var productArray = shopzillaObject.products.product;
        var chuzrArray = [];
        for (var p = 0; p < productArray.length; p++) {
            var biggestImage = productArray[p].images.image.length-1;
            var chuzrProduct =  {
                "name" : productArray[p].title,
                "brand" : productArray[p].brand.name,
                "description" : p.description,
                "image" : productArray[p].images.image[biggestImage],
                "url" : productArray[p].url.value,
                "price" : {
                    "max" : productArray[p].priceSet != undefined ? (productArray[p].priceSet.maxPrice.value) : (productArray[p].price.value),
                    "min" : productArray[p].priceSet != undefined ? (productArray[p].priceSet.minPrice.value) : (productArray[p].price.value)
                },
                "shopzillaId" : productArray[p].id,
                "categoryId" : productArray[p].categoryId
            };
            chuzrArray.push(chuzrProduct); 
            console.log('db.products.insert(' + JSON.stringify(chuzrProduct) + ');');
        };
        return chuzrArray;
    };
    
    var _massageCategory = function (shopzillaObject) {
      return {
        "categoryName" : shopzillaCategory.taxonomy.categories.category[categrory.length-1].name,
        "categoryId" : shopzillaCategory.taxonomy.categories.category[categrory.length-1].id
      };
    };

    return {
      massageCategory : _massageCategory,
      massageProduct : _massageProduct
    };

}();

module.exports = Massager;
