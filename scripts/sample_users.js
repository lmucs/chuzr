use chuzr_dev
var nameFirsts = ["Thomas", "Stephen", "Peter", "John", "Elizabeth", "Kevin", "Aloyse", "Anna", "Marika", "Mojo"]
var nameLasts = ["Costello", "O'Brien", "Powers", "Smith", "Bush", "Jones", "Draculata", "Gacs", "Fernandez", "Dogson"]
var emails = ["thomas@costello.com", "sbrien@irishluvr.net", "ppowers@gmail.com", "john.smith@sbcglobal.net", "ebush@yahoo.com", "kjones@aol.com", "adracula@ivantblud.com", "agacs@chuzr.com", "mfernandez@gmail.com", "mdog@squirrels.net"]
var logins = ["tcostello", "irishboy94", "pdangerpowers", "johnsmith", "berrybush", "kevin", "hungarianvampire", "marikafern", "barkwoofgrowl"]
var hashedPasswords = ["sdgashgkkashfgkj", "eqtuiosgdh", "123425wsdg", "sagjweo", "1234ghsdgkj", "vnlqe84", "vns428g0", "password", "jjjfff99352sjdkl", "aeglh04"]
var avatarURLs = ["www.avatarworld.com/tcostello.jpg", "www.avatarworld.com/sobrien.jpg", "www.avatarworld.com/ppowers.jpg", "www.avatarworld.com/jsmith.jpg", "www.avatarworld.com/ebush.jpg", "www.avatarworld.com/kjones.jpg", "www.avatarworld.com/adraculata.jpg", "www.avatarworld.com/agacs.jpg", "www.avatarworld.com/mfern.jpg", "www.avatarworld.com/dog.jpg"]
var reputations = [10000, 10, 2315, 78, 0, 56, 800000, 486, 735, 5]
var socialHandles = ["www.facebook.com/0", "www.facebook.com/1", "www.facebook.com/2", "www.facebook.com/3", "www.facebook.com/4", "www.facebook.com/5", "www.facebook.com/6", "www.facebook.com/7", "www.facebook.com/8", "www.facebook.com/9"]
var salts = []


for (i = 0; i < 10; i++) {
        var user = {"name.first": nameFirsts[i], "name.last": nameLasts[i], "email": emails[i], "login": logins[i], "hashedPassword": hashedPasswords[i],
                 "avatarURL": avatarURLs[i], "reputation": reputations[i], "socialHandle": socialHandles[i]};
        db.users.insert(user)
}