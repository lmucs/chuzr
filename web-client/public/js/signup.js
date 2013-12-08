$(function(){

  $("#signup").click(function(){
    //userEmailLookup looks up and returns userID based on email address -- not implemented
    // var userID = userEmailLookup($("#inputEmail").val());

        // The user
        var user = {
            email : $('#inputEmail').val(),
            hashedPassword : $('#inputPassword').val()
        }

        // POST the user.
        $.ajax({
            type: 'POST',
            url: Config.getApiBaseUrl() + "/users",
            data: JSON.stringify(user),
            contentType: 'application/json',
            dataType: 'json',
            accept: 'application/json',
            complete: function (jqXHR, textStatus) {   
              console.log("complete")
            }
        });
  });

});