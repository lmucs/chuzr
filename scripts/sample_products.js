
use chuzr_dev
var names = ["Red Ball", "Basketball", "Golf Club Set", "Silly Putty"]
var descriptions = ["Crystal clear display.", "Striking new features.", "Never before seen."]
var imageURLs = ["http://i.google.com/12.png", "http://i.reddit.com/42.png", "http://i.facebook.com/332.png", "http://i.thoughtcatalog.com/12.png"]
var ratings = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var categories = [["bouncy", "shiny", "fun"], ["new", "sale", "rubber"], ["jello", "test", "fun"]]
var prices = [0.99, 1.00, 32444, 5.95, 100, 380, 0.25, 40, 50]
var related = [["Hot Wheels", "LG TV", "Fish Bowl"], ["Coffee", "Tea", "Juice"], ["Polo", "Shorts", "Tank Top"]]

var rand = function (x) {
	return Math.floor(Math.random() * x)
}

for (i = 0; i < 1000; i++) {
	var p = {"name": names[rand(4)], "description": descriptions[rand(3)], "imageURL": imageURLs[rand(4)], "rating": ratings[rand(10)], "categories": categories[rand(3)], "price": prices[rand(9)], "related": related[rand(3)]};
	db.products.insert(p)
}