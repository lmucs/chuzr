$(function(){

  $("#signin").click(function(){
    var email = $("#inputEmail").val();
    var pass = $("#inputPassword").val();
    // POST the session.
    $.ajax({
      type: 'POST',
      url: Config.getApiBaseUrl() + "/sessions",
      data: {email: email, pass: pass},
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      complete: function (jqXHR, textStatus) {   
      console.log("complete")
      }
    });
  });
});