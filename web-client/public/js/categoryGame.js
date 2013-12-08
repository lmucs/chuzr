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
        products = jQuery.parseJSON(httpGet(Config.getApiBaseUrl() + "/products"));

    products.forEach(function(product, i) {
        product.imageLink = product.images[160];
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
        $(this).addClass("held");
        $(this).css("z-index", "100");
    });

    $(".productNode").mouseup(function(e) {
        if($(this).hasClass("held")) {
            var $productNode = $(this),
                placed = false;
            $("tr").each(function() {
                if (
                    $productNode.offset().left >= $(this).offset().left &&
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
            $(this).removeClass("held");
            $(this).css("z-index", "10");
        }
    });

});
