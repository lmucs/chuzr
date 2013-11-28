$(function(){

  $("#signin").click(function(){
    //userEmailLookup looks up and returns userID based on email address -- not implemented
    var userID = userEmailLookup($("#inputEmail").val());

    $.ajax({
      url: Config.getApiBaseUrl() + "/users" + userID,
      cache: none
    })
      .done(function(user){
        if($("#inputPassword").val() === user.hashedPassword) {
          currentUser.userID = userID;
          window.location.replace("/home");
        } else {
          window.location.replace("/");
        }

      })
  });
});