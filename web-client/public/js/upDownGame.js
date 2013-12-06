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
        productIndex,
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
                    .append($("<tr></tr>")
                        .append($("<td></td>").text(product.name))
                        .append($("<td></td>").text(product.rating))
                    );
            });
            
        },
        renderProduct = function(products) {
            productIndex = Math.floor(Math.random()*products.length);
            $("#product")
                .empty()
                .append($("<img></img>")
                    .attr("src", products[productIndex].imageLink)
                    .addClass("productImg thumbnail")
                )
                .append($("<div></div>")
                    .text(products[productIndex].name)
                );


        },
        vote = function(value) {
            products[productIndex].rating += value;
            updateStandings(products);
            renderProduct(products);
        };

    //the product image links dont acutally work right now so insert fake ones
    products.forEach(function(product, i) {
        product.imageLink = 
            (product.images && product.images[400]) ? product.images[400] : testImage;
        product.rating = 0;
    });

    console.log(products);
    renderProduct(products);

    $("#upDown")
        //up
        .append($("<img></img>")
            .addClass("arrow")
            .attr("src", "http://i.imgur.com/PdJs3Zv.png")
            .click(function () {
                vote(1);
            })

        )
        //down
        .append($("<img></img>")
            .addClass("arrow")
            .attr("src", "http://wp.iosfans.com/wp-content/uploads/2013/02/Down-vote-arrow-237x250.png")
            .click(function () {
                vote(-1);
            })
        );


})