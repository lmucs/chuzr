//Run this file in a jQuery shell (jsfiddle) to populate the database with 5 fake products, for testing purposes only. Make sure db is emptied first.

var names = ["Red Ball", "Basketball", "Golf Club Set", "Silly Putty", "Dark Chocolate with Hazelnuts"]
var brand = ["Target", "Spalding", "GolfPro", "Mattel", "Nestle Tollhouse"]
var descriptions = ["This ball bounces higher than any before it!", "Play like a pro with this NBA-standard basketball", 
                    "The set used by Tiger Woods", "There is nothign silly about the quality of this stuff!", 
                    "Roasted hazelnuts mixed with smooth and delicate dark chocolate"]
var images = [["http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/redball.jpg", "http://i.reddit.com/42.png"], 
              ["http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/sampleiamge2.jpg"],
              ["http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/golfclubset.jpg", "http://i.reddit.com/42.png"], 
              ["http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/sillyputty.jpg", "http://i.thoughtcatalog.com/12.png"],
              ["http://i94.photobucket.com/albums/l86/MythicRuler/chuzrsamplephotos/dkchoc.jpg", "http://i.reddit.com/42.png", 
               "http://i.facebook.com/332.png", "http://i.thoughtcatalog.com/12.png"]];
var urls = ["http://www.google.com/products/best_product.html", 
            "http://www.google.com/products/best_product.html", "http://www.ebay.com/products/product.html",
            "http://www.amazon.com/product.html", "http://shopzilla.com/products/favorite_product.html"]
var ratings = [1, 9, 7, 5, 10]
var minprices = [0.99, 1.00, 7.80, 5.95, 14.32]
var maxprices = [100, 60.45, 30, 75, 80]
var related = [[12643, 53342, 23566, 234453], [1, 346, 876], [98, 234, 65, 333, 23, 6]]
var shopzillaIds = [12345, 6345234, 2345, 24, 22]
var categoryIds = [77, 245, 2458475, 23423, 2222]

var rand = function (x) {
  return Math.floor(Math.random() * x)
}

for (i = 0; i < 5; i++) {
  var p = {"name": names[i], "brand" : brand[i], "description": descriptions[i], "images": images[i][0], "url" : urls[i],
           "rating": ratings[i], "price": { "max" : maxprices[i], "min" : minprices[i] }, "shopzillaId" : shopzillaIds[i],
           "categoryId" : categoryIds[i], "related": related[rand(3)]};
  $.ajax({
    type: "POST",
    url: "http://localhost:3000/products",
    data: p
  });
}
