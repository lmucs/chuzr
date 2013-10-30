$(function(){

  $("#find-products").click(function () {
    $.ajax({
      url:"http://localhost:3000/products?limit=5",
      cache: false
    }).done(function (products) {
      products.forEach(function (product) {
        $("#results").append(JSON.stringify(product))

      })
    })
  })

});