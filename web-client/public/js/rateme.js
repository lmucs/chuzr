//game.js

$(function() {
    var httpGet = function(theUrl) {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false );
            xmlHttp.send( null );
            return xmlHttp.responseText;
        },
        productCounter = 0,
        skipCount = 0;
        products = jQuery.parseJSON(httpGet(Config.getApiBaseUrl() + "/products/"));


    populateData = function (product) {
        $(".product-name").text(product.name);
        $(".product-image-rating img").attr('src', product.images[400]);
        $(".url-to-purchase a").attr('href', product.url);
        $(".product-description .description").text(product.description);
        $(".current-product-rating #current-rating").text((product.rating == null) ? "--" : product.rating);
    };

    $('#product-rating').on('change', function() {
        $("#current-rating").text($("#product-rating").val());
    });

    $('#rate-button').click(function() {
        if (productCounter == (products.length - 1)) {
            skipCount += 10;
            products = jQuery.parseJSON(httpGet(Config.getApiBaseUrl() + "/products?skip=" + skipCount));
            productCounter = 0;
        } else {
            productCounter++;
        }

        // The vote.
        var vote = {
            userId: 100,
            productId: products[productCounter]._id,
            ratingType: "numeric",
            rating: $("#product-rating").val()
        }

        // POST the vote.
        $.ajax({
            type: 'POST',
            url: Config.getApiBaseUrl() + "/votes",
            data: JSON.stringify(vote),
            contentType: 'application/json',
            dataType: 'json',
            accept: 'application/json',
            complete: function (jqXHR, textStatus) {   
                console.log("added vote")
            }
        });

        populateData(products[productCounter]);
    });

    populateData(products[productCounter]);
})