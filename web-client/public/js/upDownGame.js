$(function () {
    var httpGet = function(theUrl) {
            var xmlHttp = null;

            xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", theUrl, false );
            xmlHttp.send( null );
            return xmlHttp.responseText;
        },
        urlBase = Config.getApiBaseUrl() + "/",
        products = jQuery.parseJSON(httpGet(urlBase + "products")),
        testImage = "http://www.placehold.it/200x300",
        updateStandings = function(products) {
            $("#standings")
                .empty()
                .append($("<tr></tr>")
                    .append($("<th></th>").text("Product"))
                    .append($("<th></th>").text("Rating"))
                );

            products.sort(function(a, b) {
                return b.rating-a.rating;
            }).forEach(function(product) {
                $("#standings")
                    .append($("<tr></tr>").addClass(successRate)
                        .append($("<td></td>").text(product.name))
                        .append($("<td></td>").text(product.rating))
                    );
            });
            
        },
        renderProduct = function(products) {
            var productIndex = Math.floor(Math.random()*products.length);
            $("#product")
                .empty()
                .append($("<img></img>")
                    .attr("src", products[productIndex].imageLink)
                    .addClass("productImg thumbnail")
                )
                .append($("<div></div>")
                    .text(products[productIndex].name)
                );


        };

    //the product image links dont acutally work right now so insert fake ones
    products.forEach(function(product, i) {
        product.imageLink = testImage;
        product.rating = 0;
    });

    console.log(products);
    renderProduct(products);

    $("#upDown").append($("<div></div>")
        .addClass("arrow")
        .css("background-position", "-63px -796px")

    );
})