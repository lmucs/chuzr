
var transform = [
  {"tag":"li","html": "${id}"},
  {"tag":"ul","children":[
      {"tag":"li","html": "${nickname}"},
      {"tag":"li","html": "${image} "},
      {"tag":"li","html": "${groupUserId}"},
      {"tag":"li","html": "${label} "},
      {"tag":"li","html": "${gender} "},
      {"tag":"li","html": "${relations} "},
      {"tag":"li","html": "${objectType} "}
    ]}
];

//TODO get data from a Get call and extract desired classes to denormalize
    
var data = [{"id":32103036,"name":"Classic","nickname":"MrsClassic","userId":"0003e89c8f3a81fe4f3b8ef3cfef8eb33aae","image":"http://image13.beso-images.com/beso/personas/32103036_10.jpg","groupUserId":"000362d4ab33ac9249fc84b0705b69b8c499","label":"Theory, Reiss, Club Monaco","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32102707,"name":"Polished Casual","nickname":"PolishedCasual","userId":"0003493035b612a04df7944cdd9b2e210e7a","image":"http://image10.beso-images.com/beso/personas/32102707_10.jpg","groupUserId":"0003434ed6f2fe444c738da4dd1477cce083","label":"J Brand, Madewell, Vince","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103408,"name":"Preppy","nickname":"MrsPreppy","userId":"0003ede96731bf484393bd5a0068f5e2fe07","image":"http://image14.beso-images.com/beso/personas/32103408_10.jpg","groupUserId":"0003f7b299e100e443dfa1f9bbc91e0902c8","label":"J. Crew, Chance, Lands' End Canvas","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103003,"name":"Romantic Feminine","nickname":"RomanticFeminine","userId":"00032d42a6ed91214ba0b34d1cefddee6c01","image":"http://image12.beso-images.com/beso/personas/32103003_10.jpg","groupUserId":"00033e78ad9d239f41d5a0da087b6c8a6ed6","label":"Temperley, Diane von Furstenberg, Milly","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103526,"name":"Glam","nickname":"MrsGlam","userId":"0003a83d9466a6d24f0c971bcd90701af1b3","image":"http://image12.beso-images.com/beso/personas/32103526_10.jpg","groupUserId":"00033f68501042c64c188e6fec78a4ec322e","label":"Herve Leger, Dolce & Gabanna, Forever 21","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103422,"name":"Bohemian","nickname":"MrsBohemian","userId":"0003ee0084197a5c46bd9ec70684ace241dd","image":"http://image10.beso-images.com/beso/personas/32103422_10.jpg","groupUserId":"000329f8aebc8eb74756bfffe8380a33202c","label":"Free People, Isabel Marant, Antik Batik","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103515,"name":"Rocker","nickname":"MrsRocker","userId":"0003806bcd73a99c4c2691b5e08f1943eaa5","image":"http://image11.beso-images.com/beso/personas/32103515_10.jpg","groupUserId":"0003c9b5560e3545462a977c55d3d4ab144b","label":"Rick Owens, Allsaints Spitalfields, Cheap Monday","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32102957,"name":"Avant Garde","nickname":"Elisssseeeeeeee","userId":"0003273fa50e69ea44589fda79998c39187a","image":"http://image11.beso-images.com/beso/personas/32102957_10.jpg","groupUserId":"0003141587cc3c3e48c28639f2880978b048","label":"Suno, Zara, A Detacher","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32104071,"name":"Beauty","nickname":"BeautyBeso","userId":"0003c2b3b70add554291b90c2fa4080515dc","image":"http://image10.beso-images.com/beso/personas/32104071_10.jpg","groupUserId":"0003db7bc8c542f34137834075c9aac8bb24","label":"Nars, Bobbi Brown, Aveda","relations":[],"objectType":"ACCOUNT"}];

document.getElementById('list').innerHTML = json2html.transform(data,transform);
