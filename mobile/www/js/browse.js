$(function(){

  $("#find-products").click(function () {
    
    $( ".product-capsule" ).remove();
    var newContent='';
    var searchTerm = document.getElementById('prependDropdownButton').value;
    var searchUrl = "";

    if (document.getElementById('search-menu').value == 'name') {
       searchUrl = Config.getApiBaseUrl() + "/products?name=";
    }
    if (document.getElementById('search-menu').value == 'brand') {
       searchUrl = Config.getApiBaseUrl() + "/products?brand=";
    }
    
    $.ajax({
      url: searchUrl + searchTerm,
      cache: false
    }).done(function (products) {
      products.forEach(function (product) {
        newContent += '<div class="product-capsule">';
        newContent += '<div class="capsule-top">';
        newContent += '<a href="/product/' + product._id + '">' + product.name
        newContent += '</a>';
        newContent += '</div>';
        newContent += '<div class="capsule-image">';
        newContent += '<img src="' + product.images[0] + '">';
        newContent += '</img>';
        newContent += '</div>';
        newContent += '<div class="capsule-bottom">';
        newContent += '</div>';
        newContent += '<div class="capsule-hover">';
        newContent += '<p>' + product.description;
        newContent += '</p>';
        newContent += '</div>';
        newContent += '</div>';
      })
    $("#main-content").append(newContent);
    $(".product-capsule").hover(
      function() {
        $(this).find(".capsule-hover").css("display","block");
      },
      function() {
        $(this).find(".capsule-hover").css("display","none");
      }
    );
    })
  })
  $("#prependDropdownButton").keypress(function(e){
    if(e.which == 13){
      $("#find-products").click();
    }
  });
});
