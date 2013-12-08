var Massager = function () {

  var _products = function (shopzillaObject, category) {
    var chuzrProducts = [];
    if (shopzillaObject) {
      var shopzillaProducts = shopzillaObject.products.product;
      for (p in shopzillaProducts) {
        var chuzrProduct = _product(shopzillaProducts[p], category);
        chuzrProducts.push(chuzrProduct);
      };
    }
    return chuzrProducts;
  };

  var _images = function (imageObject) {
    var chuzrImages = {};
    if (imageObject) {
      var shopzillaImages = imageObject.image;
      if (shopzillaImages) {
        for (i in shopzillaImages) {
          var image = shopzillaImages[i];
          chuzrImages[image.xsize] = image.value;
        }
      }
    }
    return chuzrImages;
  };

  var _product = function (shopzillaProduct, category) {
    var chuzrProduct =  {
        "name" : shopzillaProduct.title || null,
        "brand" : (shopzillaProduct.brand) ? shopzillaProduct.brand.name : null,
        "description" : shopzillaProduct.description || null,
        "images" : _images(shopzillaProduct.images),
        "url" : shopzillaProduct.url.value || null,
        "price" : {
            "max" : (shopzillaProduct.priceSet) ? (shopzillaProduct.priceSet.maxPrice.value) : (shopzillaProduct.price.value),
            "min" : (shopzillaProduct.priceSet) ? (shopzillaProduct.priceSet.minPrice.value) : (shopzillaProduct.price.value)
        },
        "shopzillaId" : shopzillaProduct.id,
        "category" : category
    };
    return chuzrProduct;
  };

  var _taxonomy = function (taxonomyTree) {
    return taxonomyTree;
  };
  
  var _updatedProduct = function (original, updates) {
    original.name = (updates.name) ? updates.name : original.name;
    original.brand = (updates.brand_name) ? updates.brand_name : original.brand;
    original.description = (updates.desc_short) ? updates.desc_short : original.description;
    original.images['400'] = (updates.merchantListing.merchantProduct.imageURL_large) ? updates.merchantListing.merchantProduct.imageURL_large : original['400'];
    original.images['160'] = (updates.merchantListing.merchantProduct.imageURL_medLarge) ? updates.merchantListing.merchantProduct.imageURL_medLarge : original['160'];
    original.images['100'] = (updates.merchantListing.merchantProduct.imageURL_med) ? updates.merchantListing.merchantProduct.imageURL_med : original['100'];
    original.image['60'] = (property.prodcut.merchantListing.merchantProduct.imageURL_small) ? property.prodcut.merchantListing.merchantProduct.imageURL_small : original.image['60'];
    original.url = (updates.URL) ? updates.URL : original.url;
    original.price.max = (updates.price) ?  updates.price : original.price.max;
    original.price.min = (updates.price) ? updates.price : original.price.min;
    original.category.id = (updates['-category_id']) ?  updates['-category_id'] : original.catgory.id;
    original.category.name = (updates['category_name']) ? updates['category_name'] : original.category.name;   
    return original;
  };

  return {
    images: _images,
    product: _product,
    products: _products,
    updatedProduct: _updatedProduct,
    taxonomy: _taxonomy
  };

}();

module.exports = Massager;
