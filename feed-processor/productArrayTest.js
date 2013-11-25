var object = require('./testObjects/shopzillaGet'),
    massage = require('../massager')

var productArray = object.products.product;

console.log(productArray[0].brand.name);
