$(function(){

  $("#find-products").click(function () {
    
    $( ".product-capsule" ).remove();
    var newContent='';
    var searchTerm = document.getElementById('prependDropdownButton').value;
    var url = "";
    if (document.getElementById('search-menu').value == 'name') {
       url = "http://localhost:3000/products?name=";
    }
    if (document.getElementById('search-menu').value == 'brand') {
       url = "http://localhost:3000/products?brand=";
    }
    
    $.ajax({
      url: url + searchTerm,
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
  $("#prependDropdownButton").keypress(function(e){
    if(e.which == 13){
      $("#find-products").click();
    }
  });
});
