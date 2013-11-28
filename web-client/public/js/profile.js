$(function(){
  var userID = 4,
      name = '',
      email = '',
      login = '',
      password = '',
      avatarURL = '',
      reputation = 0,
      socialHandle = '';
  $.ajax({
    url: Config.getApiBaseUrl() + "/users",
    cache: false
  }).done(function(user){
    var u = user[userID]
    name = u.name.first;
    email = u.email;
    login = u.login;
    password = u.hashedPassword;
    avatarURL = u.avatarURL;
    reputation = u.reputation;
    socialHandle = u.socialHandle;

    $("#user-name").text(name);
    $("#user-email").text(email);
    $("#user-login").text(login);
    $("#user-password").text(password);
    $("#user-reputation").text(reputation);
    $("#user-socialHandle").text(socialHandle);
    $("#user-photo").attr("src", avatarURL);

  })

});