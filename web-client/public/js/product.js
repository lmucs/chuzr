//product.js

$(function() {
	var httpGet = function(theUrl) {
		    var xmlHttp = null;

		    xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false );
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		},

		productId = $(".product-name").attr('product-id'),
		product = jQuery.parseJSON(httpGet("http://localhost:3000/products/" + productId)),

		populateData = function (product) {
		    console.log("http://localhost:3000/products/" + productId);
		    console.log(product);
		    $(".product-name").text(product.name);
		    $(".product-image-rating img").attr('src', product.images[0]);
		    $(".url-to-purchase a").attr('href', product.url);
		    $(".product-description .description").text(product.description);
		    $(".current-product-rating .rating").text(product.rating);
		    $(".current-product-rating a").attr('href', 'http://localhost:3001/rateme/' + productId);
        };
	
	populateData(product);
})
