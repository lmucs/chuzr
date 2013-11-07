$(function(){

  $("#find-products").click(function () {
    var name = '',
        description = '',
        rating = '',
        imageURL = '',
        categories = '',
        price = '',
        related = '';
    $.ajax({
      url:"http://localhost:3000/products?limit=5",
      cache: false
    }).done(function (products) {
      products.forEach(function (product) {
        $("#results").append(JSON.stringify(product));

      var productResult = productResult.products,
          name = productResult.name;
          description = productResult.description;
          rating = productResult.rating;
          categories = productResult.categories;
          price = productResult.price;
          related = productResult.related;
      
      $("#product-name").text(name);
      $("#product-description").text(description);
      $("#product-rating").text(rating);
      $("#product-categories").text(categories);
      $("#product-price").text(price);
      $("#product-related").text(related);

      })
    })
  })

});