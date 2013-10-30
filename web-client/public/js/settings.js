$(function(){
  var userID = 1,
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
    url:"http://localhost:3000/products/526024925d503660ea5a69be",
    cache: false
  })  
    .done(function(user){
      console.log("ajax retrieved" );
      console.log(user);
      
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

      console.log("name: " + name);

      $("#displayName").attr("placeholder", displayName);
      $("#name").attr("placeholder", name);
      $("#location").text(location);
      $("#birthMonth").text(birthMonth);
      $("#birthDate").text(birthDate);
      $("#birthYear").text(birthYear);
      $("#aboutMe").text(aboutMe);
      $("#website").text(website);
    });
});