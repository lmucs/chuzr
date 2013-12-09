//game.js

$(function() {
    var httpGet = function(theUrl) {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false );
            xmlHttp.send( null );
            return xmlHttp.responseText;
        },

        productId = $(".product-name").attr('product-id'),
        product = jQuery.parseJSON(httpGet(Config.getApiBaseUrl() + "/products/" + productId));


    $('#rate').click(function() {
        $("#rating > h1").text("0");
        $("#slider").slider("setValue", 0);

        // $.ajax({
        //        type: 'POST',
        //        url: Config.getApiBaseUrl() + '/votes',
        //        data: JSON.stringify(),
        //        contentType: 'application/json',
        //        dataType: 'json',
        //        accept: 'application/json',
        //        complete: function (jqXHR, textStatus) {   

        //        }
        //    });
    });

    populateData = function (product) {
        console.log(Config.getApiBaseUrl() + "/products/" + productId);
        console.log(product);
        $(".product-name").text(product.name);
        $(".product-image-rating img").attr('src', product.imageURL);
        $(".url-to-purchase a").attr('href', product.imageURL);
        $(".product-description .description").text(product.description);
        $(".current-product-rating .rating").text(product.rating);
    };



    $('.slider').slider('setValue', 0)
        .on('slide', function(ev){
             $('#rating > h1').text(ev.value);
         });

    populateData(product);
})