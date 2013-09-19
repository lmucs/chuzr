// This currently uses a mock users array just to get things up and running.
// i Students will need to replace this with a real MongoDB

var VALID_PROPERTIES = [
    'name', 'description', 'imageURL', 'rating', 'categories', 'price', 'related'
]

module.exports = Product = function (name, description, imageURL, rating, categories, price, related) {
     this.name = name;   
     this.id = maxId++;
     this.description = description;
     this.imageURL = imageURL;
     this.rating = rating;
     this.categories = categories;
     this.price = price;
     this.related = related;
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

var furby = new Product("Furby", "Creepy Toy", "google.com", 8, [], 10.99, []);

