

var names = ["Red Ball", "Basketball", "Golf Club Set", "Silly Putty", "Dark Chocolate with Hazelnuts"]
var brand = ['Nike', 'Doc Martens', 'Ben & Jerry\'s', 'J. Crew', 'Nestle Tollhouse', 'Papa John\'s']
var descriptions = ["Crystal clear display.", "Striking new features.", "Never before seen."]
var images = [["http://ecx.images-amazon.com/images/I/518ayXo%2B7nL._SL500_.jpg", "http://i.reddit.com/42.png", "http://i.facebook.com/332.png", "http://i.thoughtcatalog.com/12.png"]]
var urls = ["http://www.google.com/products/best_product.html", "http://www.ebay.com/products/product.html", "http://www.amazon.com/product.html", "http://shopzilla.com/products/favorite_product.html"]
var ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var minprices = [0.99, 1.00, 7.80, 5.95, 14.32, 10.8, 0.25, 4, 5]
var maxprices = [100, 60.45, 30, 75, 80, 20, 43.66]
var related = [[12643, 53342, 23566, 234453], [1, 346, 876], [98, 234, 65, 333, 23, 6]]
var shopzillaIds = [12345, 6345234, 2345, 24, 22, 8, 234256, 7653, 234, 64535, 752453]
var categoryIds = [77, 245, 2458475, 23423, 2222, 4443, 4356878, 425]

var rand = function (x) {
  return Math.floor(Math.random() * x)
}

for (i = 0; i < 1000; i++) {
  var p = {"name": names[rand(5)], "brand" : brand[rand(6)], "description": descriptions[rand(3)], "images": images[0], "url" : urls[rand(4)], "rating": ratings[rand(10)], "price": { "max" : maxprices[rand(7)], "min" : minprices[rand(9)] }, "shopzillaId" : shopzillaIds[rand(3)], "categoryId" : categoryIds[rand(8)], "related": related[rand(3)]};
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/products",
    data: p
  });
}
