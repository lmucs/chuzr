var sideNavShown = true;
          sideNavToggle = function(){
            $("#side-nav-toggle").click(function(){
              if(sideNavShown){              
                $("#side-nav").hide(100);
                $("#toggle-caret").text("▶");
                $("#main-content").css("width", "95%");
                sideNavShown = false;
              } else {
                $("#side-nav").show(100);
                $("#toggle-caret").text("◀");
                $("#main-content").css("width", "70%");
                sideNavShown = true;
              }
            });

          };
      sideNavToggle();