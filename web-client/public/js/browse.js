$(function(){

  $("#find-products").click(function () {
    
    var newContent='';
    
    $.ajax({
      url:"http://localhost:3000/products?limit=6",
      cache: false
    }).done(function (products) {
      products.forEach(function (product) {
        newContent += '<div class="product-capsule">';
        newContent += '<div class="capsule-top">';
        newContent += '<a href="http://localhost:3001/play">' + product.name
        newContent += '</a>';
        newContent += '</div>';
        newContent += '<div class="capsule-image">';
        newContent += '<img src="' + product.images[0] + '">';
        newContent += '</img>';
        newContent += '</div>';
        newContent += '<div class="capsule-bottom">';
        newContent += '</div>';
        newContent += '</div>';
      })
    $("#main-content").append(newContent);   
   })
  })
});
