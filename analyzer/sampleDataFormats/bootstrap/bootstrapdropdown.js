    var item = null;
      var format = null;
      //when submitted
      $("#test1").click( function() {
        $("#iframe").attr('src','http://www.yahoo.com');
        if(item === null){
          alert("please select an item you want to see.");
        }
        if(format === null){
          alert("please select a format you want to see.");
        }

        if(item !== null && format !== null){
          if(format === "HTML"){
            window.location = "../json2html.html";
          }
          else if(format === "JSON"){
            window.location = "";
          }
        }
          
      });

      $("#PRODUCTS").click(function() {
          selectedButtonItem("PRODUCTS");

      });
      $("#COUPONS").click(function() {
          selectedButtonItem("COUPONS");

      });

      $("#USERS").click(function() {
          selectedButtonItem("USERS");

      });

      $("#VOTES").click(function() {
        selectedButtonItem("VOTES");

      });


      $("#JSON").click(function() {
          selectedButtonFormat("JSON");

      });

      $("#CSV").click(function() {
          selectedButtonFormat("CSV");

      });

      $("#TREEMAP").click(function() {
         selectedButtonFormat("TREEMAP");

      });

      $("#CIRCLEPACK").click(function() {
          selectedButtonFormat("CIRCLEPACK");

      });

      $("#HTML").click(function() {
          selectedButtonFormat("HTML");
      });

      var selectedButtonFormat = function(value){
        format = value;
        $("#format").html(value);
        $("#dropdown-2").css('display', 'none');
        $(document).find('.dropdown-open').removeClass('dropdown-open');
      };

      var selectedButtonItem = function(value){
        item = value;
        $("#item").html(value);
        $("#dropdown-1").css('display', 'none');
        $(document).find('.dropdown-open').removeClass('dropdown-open');
      }

      $("#format").click(function(event, dropdownData) {
        
      });