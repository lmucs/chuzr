//game.js

$(function() {
	var httpGet = function(theUrl) {
		    var xmlHttp = null;

		    xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false );
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		},
		products = jQuery.parseJSON(httpGet("http://localhost:3000/products")),
		testImages = [
			"http://thementalshift.com/images/Products2.jpg",
			"http://img4-3.myrecipes.timeinc.net/i/recipes/ck/11/05/peach-chicken-pizza-ck-l.jpg",
			"http://droneflyers.com/wp-content/uploads/2011/12/ar_drone_2.jpg",
			"http://www.thenoisecast.com/wp-content/uploads/2011/02/shake-weight.png",
			"http://cdn.cultofmac.com/wp-content/uploads/2011/02/macbook-pro-with-bad-credit.jpg",
			"http://www.whatlaptop.co.uk/files/2012/07/Windows-8-tut-cover.jpg",
			"http://fc03.deviantart.net/fs70/f/2010/015/a/1/Charizard_v_2_by_Xous54.png",
			"http://info.roosterbank.com/blog/wp-content/uploads/2012/10/Furby2012Purple.jpg",
			"http://media-cerulean.cursecdn.com/attachments/5/860/mega_venusaur.png",
			"http://oyster.ignimgs.com/mediawiki/apis.ign.com/pokemon-blue-version/4/4a/Blastoise.gif",
			"http://www.asianweek.com/wp-content/uploads/2012/08/ping_pong_paddle.jpg",
			"http://olympicdistancetriathlons.com/wp-content/uploads/2012/06/CarbonFiberTriathlonBike.jpg"
		];


	console.log(products);

	//the product image links dont acutally work right now so insert fake ones
	products.forEach(function(product, i) {
		product.imageLink = testImages[i];
	});


	$("#productImgLeft").attr("src", products[0].imageLink);
	$("#productImgRight").attr("src", products[1].imageLink);

})