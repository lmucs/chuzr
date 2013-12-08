$(function(){

  $("#signin").click(function(){
    var email = $("#inputEmail").val();
    var pass = $("#inputPassword").val();
    $.post("http://localhost:3000/sessions", {email: email, pass: pass})
      .done(function(){
        window.location.replace('/home');

      })
      .fail(function() {
        window.location.replace('/');
      })
  });
});