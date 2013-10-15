$(function(){

  $("#signin").click(function(){
    //userEmailLookup looks up and returns userID based on email address -- not implemented
    var userID = userEmailLookup($("#inputEmail").val());

    $.ajax({
      url:"http://localhost:3000/users" + userID,
      cache: none
    })
      .done(function(user){
        if($("#inputPassword").val() === user.hashedPassword) {
          currentUser.userID = userID;
          window.location.replace("http://localhost:3001/home");
        } else {
          window.location.replace("httpL//localhost:3001");
        }

      })
  });
});