$(function(){
  var sideNavShown = true;
  $("#side-nav-toggle").hover(
      function(){
        $("#side-nav-toggle").css("width", "20px");
        if(sideNavShown){
          $("#toggle-caret").text("◀");
        }else{
          $("#toggle-caret").text("▶");          
        }
      },
      function(){
        $("#side-nav-toggle").css("width", "5px");
        $("#toggle-caret").text("");
      });

  $("#side-nav-toggle").click(function(){
    if(sideNavShown){              
      $("#side-nav").hide(100);
      $("#main-content").css("width", "95%");
      sideNavShown = false;
    } else {
      $("#side-nav").show(100);
      $("#main-content").css("width", "70%");
      sideNavShown = true;
    }
  });




});