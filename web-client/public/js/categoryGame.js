$(function() {
	var categories = ["electronics", "apparel", "recreation", "tools"],
		initialLoc,
		httpGet = function(theUrl) {
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

	//the product image links dont acutally work right now so insert fake ones
	products.forEach(function(product, i) {
		product.imageLink = testImages[i%testImages.length];
		$("#productSpace").append($("<div></div>")
			.attr("class", "productNode")
			.append($("<div></div>")
				.text(product.name)
				.css("width", "100px")
			)
			.append($("<img></img>")
				.attr("src", product.imageLink)
				.attr("width", "100px")
				.attr("height", "150px")
			)
			.draggable()
		)
	});

	categories.forEach(function(category){
		$("#categoryTable").append($("<tr></tr>")
			.append($("<td></td>")
				.text("Place " + category + " here")
			)
			.append($("<td></td>")
				.attr("class", "list")
				.text("Item List")
			)
		)
	});

	$(".productNode").mousedown(function(e) {
		initialLoc = $(this).offset();
	});


	$(".productNode").mouseup(function(e) {
		var $productNode = $(this),
			placed = false;
		$("tr").each(function() {
			if ($productNode.offset().left >= $(this).offset().left &&
				$productNode.offset().top >= $(this).offset().top &&
				$productNode.offset().top < ($(this).offset().top + +$(this).height())
				) {
				placed = true;
				$productNode.offset({
					top: $(this).offset().top + 30,
					left: $(this).offset().left + 10 + $(this).find("div").length * 100
				})

				$(this).find(".list")
					.append(
						$("<div></div")
							.text($productNode.find("div").text())
					);

			}
		});

		if(!placed) {
			$productNode.offset(initialLoc);
		}
	});




});




