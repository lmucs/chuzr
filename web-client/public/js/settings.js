$(function(){
  var userID = user.userID,
      displayName = '',
      name = '',
      location = '',
      birthMonth= 00,
      birthDate= 00,
      birthYear= 00,
      aboutMe = '',
      website = '',
      profilePicture = '',
      password = '';

  $.ajax({
    url:"http://localhost:3000/users" + userID,
    cache: false
  })  
    .done(function(user){
      displayName = user.displayName;
      name = user.name;
      location = user.location;
      birthMonth = user.birthMonth;
      birthDate = user.birthDate;
      birthYear = user.birthYear;
      aboutMe = user.aboutMe;
      website = user.websiteURL;
      profilePicture = user.avatarURL;
      password = user.hashedPassword;

      $("#displayName").text(displayName);
      $("#name").text(name);
      $("#location").text(location);
      $("#birthMonth").text(birthMonth);
      $("#birthDate").text(birthDate);
      $("#birthYear").text(birthYear);
      $("#aboutMe").text(aboutMe);
      $("#website").text(website);
    })
});