$(function(){
  var sideNavShown = true;

  $("#side-nav-toggle").hover(
      function(){
        $("#side-nav-toggle").animate({"width": "25px"}, 200);
        if(sideNavShown){
          $("#toggle-caret").text("◀");
        }else{
          $("#toggle-caret").text("▶");          
        }
      },
      function(){
        $("#side-nav-toggle").animate({"width": "7px"},600);
        $("#toggle-caret").text("");
      });

  $("#side-nav-toggle").click(function(){
    if(sideNavShown){              
      $("#side-nav").animate({"width": "hide"});
      $("#side-nav-toggle").animate({"width": "7px"});
      $("#toggle-caret").text("");
      $("#main-content").addClass("span12");
      $("#main-content").removeClass("span10");
      sideNavShown = false;
    } else {
      $("#side-nav").animate({"width": "show"});
      $("#side-nav-toggle").animate({"width": "7px"});
      $("#toggle-caret").text("");
      $("#main-content").addClass("span10");
      $("#main-content").removeClass("span12");
      sideNavShown = true;
    }
    
  });
});