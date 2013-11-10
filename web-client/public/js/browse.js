$(function(){

  $("#find-products").click(function () {
    var productId = 4,
        name = '',
        brand = '',
        description = '',
        images = '',
        url = '',
        price = [],
        rating = 10,
        shopzillaId = 0,
        categoryId = 0,
        related = '';
    $.ajax({
      url:"http://localhost:3000/products?limit=1",
      cache: false
    }).done(function (products) {
      products.forEach(function (product) {
        $("#results").append(JSON.stringify(product, null, 4));
        $("#product-name").text(name);
        $("#product-brand").text(brand);
        $("#product-description").text(description);
        $("#product-images").text(images);
        $("product-url").text(url);
        $("#product-price").text(price);
        $("#product-rating").text(rating);
        $("#product-shopzillaId").text(shopzillaId);
        $("#product-categoryId").text(categoryId);
        $("#product-related").text(related);

      })
    })
  })

});