// This currently uses a mock users array just to get things up and running.
// i Students will need to replace this with a real MongoDB

var VALID_PROPERTIES = [
  'name', 'description', 'imageURL', 'rating', 'categories', 'price', 'related'
];

module.exports = Product = function (productData) {
  this.id = maxId++;
  
  VALID_PROPERTIES.forEach(function (property) {
    if (property in productData){
      this[property] = productData[property];
    }
  }, this);
  
  mockProducts.push(this);
}


Object.defineProperty(Product, 'NO_SUCH_PRODUCT', {
  configurable: false,
  enumerable: false,
  writable: false,
  value: {}
});

Product.findAll = function (skip, limit) {
  return mockProducts.slice(skip, skip + limit);
}

Product.findById = function (id) {
  // HAHA OBVIOUSLY THIS IS NOT THE REAL FINAL CODE
  for (var i = 0; i < mockProducts.length; i++) {
    if (+id === mockProducts[i].id) {
      return mockProducts[i];
    }
  }
  throw Product.NO_SUCH_PRODUCT;
}

Product.prototype.save = function (id, productData) {

}

Product.prototype.delete = function (id) {
        
}

//Fake storage until DB in
var mockProducts = [];
var maxId = 0;

new Product({name : "Furby", description : "Creepy Toy", imageURL : "google.com", rating : 8, categories : [], price : 19.99, related : []});
new Product({name : "Shake-Weight", description : "Suggestive workout machine", imageURL : "NSFW", rating : 10, categories : ["infomercial", "exercise"], price : "3 easy payments of 9.99", related : ["Sketchers ShapeUps"]});
