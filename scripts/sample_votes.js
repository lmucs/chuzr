use chuzr_dev

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function choice(s) {
  var choices = s.split('|');
  return choices[randomInt(0, choices.length)];
}

var voteOptions = {
  userIds: "100|12341|564321|135243|78896876|4342|3456345",
  ratingTypes: "numeric|comparison|upDown"
};

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

function voteOnProducts() {
	db.products.find().forEach(function(product) {
		for (var i = 0; i < 10; i++) {
			db.votes.insert({
				userId : choice(voteOptions.userIds),
				productId : product._id.str,
				ratingType : choice(voteOptions.ratingTypes),
				rating : randomInt(0, 10),
			    timeStamp: randomDate(new Date(2013 - (i - 1), randomInt(1, 12), randomInt(1, 28)), new Date(2013 - i, randomInt(1, 12), randomInt(1, 28))),
			    active: i === 0
			})
		}
	});
}

voteOnProducts();

