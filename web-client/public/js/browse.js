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
        $("#results").append(JSON.stringify(product.name, null, 4));
        $("#product-name").text(product.name);
        $("#product-brand").text(product.brand);
        $("#product-description").text(product.description);
        document.getElementById('product-images').setAttribute('src', product.images[0]);
        $("product-url").text(product.url);
        $("#product-price").text(product.price);
      })
    })
  })

});