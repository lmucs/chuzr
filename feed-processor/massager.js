module.exports = Massager;

var Massager = function () {

    var _massageProduct = function (shopzillaProduct) {
      return  {
        "name" : shopzillaProduct.title,
        "brand" : shopzillaProduct.brand.name,
        "description" : shopzillaProduct.description,
        "image" : shopzillaProduct.images.image[image.length-1],
        "url" : shopzillaProduct.url.value,
        "price" : {
            "max" : shopzillaProduct.priceSet.maxPrice.value,
            "min" : shopzillaProduct.priceSet.minPrice.value
        },
        "shopzillaId" : shopzillaProduct.id,
        "categoryId" : shopzillaProduct.categoryId
      };
    };

    var _massageCategory = function (shopzillaCategory) {
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

