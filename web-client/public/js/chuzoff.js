//game.js

$(function() {
	var httpGet = function(theUrl) {
		    var xmlHttp = null;

		    xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false );
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		},
		urlBase = Chuzr.getChuzrHost() +":3000/",
		products = jQuery.parseJSON(httpGet(urlBase + "products")),
		testImage = "http://www.placehold.it/200x300",
		createChuzOff = function(products) {
			product1Index = Math.floor(Math.random()*products.length);
			product2Index = Math.floor(Math.random()*(products.length - 1));

			if(product2Index >= product1Index) {
				product2Index++;
			}

			$("#productImgLeft")
				.attr("src", "")
				.attr("src", products[product1Index].imageLink);
			$("#leftTitle").text(products[product1Index].name);

			$("#productImgRight")
				.attr("src", "")
				.attr("src", products[product2Index].imageLink);
			$("#rightTitle").text(products[product2Index].name);
		},
		updateStandings = function(products) {
			$("#standings")
				.empty()
				.append($("<tr></tr>")
					.append($("<th></th>").text("Product"))
					.append($("<th></th>").text("Chuz Offs"))
					.append($("<th></th>").text("Chuz Off Wins"))
					.append($("<th></th>").text("Winning Percent"))
				);

			products.sort(function(a, b) {
				return b.winPercent-a.winPercent;
			}).forEach(function(product) {
				var successRate = product.winPercent >= 80 ? "success" :
													product.winPercent >= 50 ? "warning" : "error";
				$("#standings")
					.append($("<tr></tr>").addClass(successRate)
						.append($("<td></td>").text(product.name))
						.append($("<td></td>").text(product.chuzOffs))
						.append($("<td></td>").text(product.chuzOffWins))
						.append($("<td></td>").text(product.winPercent))
					);
			});
			
		},
		product1Index = Math.floor(Math.random()*products.length),
		product2Index = Math.floor(Math.random()*products.length - 1);

	if(product2Index >= product1Index) {
		product2Index++;
	}

	//the product image links dont acutally work right now so insert fake ones
	products.forEach(function(product, i) {

		product.imageLink = testImage;
		product.chuzOffs = 0;
		product.chuzOffWins = 0;
		product.winPercent = 0;
	});


	$("#productImgLeft")
		.attr("src", products[product1Index].imageLink);
	$("#leftTitle").text(products[product1Index].name);

	$("#productImgRight")
		.attr("src", products[product2Index].imageLink);
	$("#rightTitle").text(products[product2Index].name);


	$(".highlight").click(function() {
		products[product1Index].chuzOffs++;
		products[product2Index].chuzOffs++;

		if($(this).attr("id") === "leftHighlight") {
			products[product1Index].chuzOffWins++;
		} else {
			products[product2Index].chuzOffWins++;			
		}

		products[product1Index].winPercent = Math.floor(10000*products[product1Index].chuzOffWins/products[product1Index].chuzOffs)/100;
		products[product2Index].winPercent = Math.floor(10000*products[product2Index].chuzOffWins/products[product2Index].chuzOffs)/100;
		updateStandings(products);
		createChuzOff(products);
	});
})