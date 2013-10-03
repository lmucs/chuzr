var json2csv = require('json2csv');
var fs = require('fs');

/*
var json = [
{
   "personasByCategory":{
      "Women's":[
         {
            "id":32103036,
            "name":"Classic",
            "nickname":"MrsClassic",
            "userId":"0003e89c8f3a81fe4f3b8ef3cfef8eb33aae",
            "image":"http://image13.beso-images.com/beso/personas/32103036_10.jpg",
            "groupUserId":"000362d4ab33ac9249fc84b0705b69b8c499",
            "label":"Theory, Reiss, Club Monaco",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32102707,
            "name":"Polished Casual",
            "nickname":"PolishedCasual",
            "userId":"0003493035b612a04df7944cdd9b2e210e7a",
            "image":"http://image10.beso-images.com/beso/personas/32102707_10.jpg",
            "groupUserId":"0003434ed6f2fe444c738da4dd1477cce083",
            "label":"J Brand, Madewell, Vince",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103408,
            "name":"Preppy",
            "nickname":"MrsPreppy",
            "userId":"0003ede96731bf484393bd5a0068f5e2fe07",
            "image":"http://image14.beso-images.com/beso/personas/32103408_10.jpg",
            "groupUserId":"0003f7b299e100e443dfa1f9bbc91e0902c8",
            "label":"J. Crew, Chance, Lands' End Canvas",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103003,
            "name":"Romantic Feminine",
            "nickname":"RomanticFeminine",
            "userId":"00032d42a6ed91214ba0b34d1cefddee6c01",
            "image":"http://image12.beso-images.com/beso/personas/32103003_10.jpg",
            "groupUserId":"00033e78ad9d239f41d5a0da087b6c8a6ed6",
            "label":"Temperley, Diane von Furstenberg, Milly",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103526,
            "name":"Glam",
            "nickname":"MrsGlam",
            "userId":"0003a83d9466a6d24f0c971bcd90701af1b3",
            "image":"http://image12.beso-images.com/beso/personas/32103526_10.jpg",
            "groupUserId":"00033f68501042c64c188e6fec78a4ec322e",
            "label":"Herve Leger, Dolce & Gabanna, Forever 21",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103422,
            "name":"Bohemian",
            "nickname":"MrsBohemian",
            "userId":"0003ee0084197a5c46bd9ec70684ace241dd",
            "image":"http://image10.beso-images.com/beso/personas/32103422_10.jpg",
            "groupUserId":"000329f8aebc8eb74756bfffe8380a33202c",
            "label":"Free People, Isabel Marant, Antik Batik",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103515,
            "name":"Rocker",
            "nickname":"MrsRocker",
            "userId":"0003806bcd73a99c4c2691b5e08f1943eaa5",
            "image":"http://image11.beso-images.com/beso/personas/32103515_10.jpg",
            "groupUserId":"0003c9b5560e3545462a977c55d3d4ab144b",
            "label":"Rick Owens, Allsaints Spitalfields, Cheap Monday",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32102957,
            "name":"Avant Garde",
            "nickname":"Elisssseeeeeeee",
            "userId":"0003273fa50e69ea44589fda79998c39187a",
            "image":"http://image11.beso-images.com/beso/personas/32102957_10.jpg",
            "groupUserId":"0003141587cc3c3e48c28639f2880978b048",
            "label":"Suno, Zara, A Detacher",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32104071,
            "name":"Beauty",
            "nickname":"BeautyBeso",
            "userId":"0003c2b3b70add554291b90c2fa4080515dc",
            "image":"http://image10.beso-images.com/beso/personas/32104071_10.jpg",
            "groupUserId":"0003db7bc8c542f34137834075c9aac8bb24",
            "label":"Nars, Bobbi Brown, Aveda",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         }
      ],
      "Men's":[
         {
            "id":32103639,
            "name":"Casual",
            "nickname":"MrCasual",
            "userId":"0003c7e9f27e832c41a7a3a638c804e8b842",
            "image":"http://image14.beso-images.com/beso/personas/32103639_10.jpg",
            "groupUserId":"000374c9ac452d5844a4a281748670ae0935",
            "label":"Levi's, Gap, Old Navy",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103657,
            "name":"Preppy",
            "nickname":"MrPreppy",
            "userId":"000344b7318e2b124755ad48ca45e4317934",
            "image":"http://image11.beso-images.com/beso/personas/32103657_10.jpg",
            "groupUserId":"0003c65b9a281319416da0dd994cad7f8973",
            "label":"J.Crew, L.L. Bean Signature, Bonobos",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103694,
            "name":"Professional",
            "nickname":"MrProfessional",
            "userId":"00031912219da5804b739c217616594905cf",
            "image":"http://image12.beso-images.com/beso/personas/32103694_10.jpg",
            "groupUserId":"000331eca390561945149a4fc11a27dba336",
            "label":"Brooks Brothers, Prada, Cole Haan",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103608,
            "name":"Surfer",
            "nickname":"MrSurfer",
            "userId":"0003c96a5db53ff341d89bfa00acde9389f9",
            "image":"http://image13.beso-images.com/beso/personas/32103608_10.jpg",
            "groupUserId":"0003121646316f364b0e854e6a2b3e55f8f5",
            "label":"Levis, Gap, Alternative Apparel",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103933,
            "name":"Street",
            "nickname":"MrStreet",
            "userId":"000356893bd6875d493c9b9607e5b8980863",
            "image":"http://image13.beso-images.com/beso/personas/32103933_10.jpg",
            "groupUserId":"0003e568f61b84ae45f68baf713c3d02d455",
            "label":"RVCA, Cheap Monday, Rag & Bone",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32103648,
            "name":"Athletic",
            "nickname":"Athletic",
            "userId":"00033d8a4a817d6d4bc68f2fd06bf9c4169b",
            "image":"http://image10.beso-images.com/beso/personas/32103648_10.jpg",
            "groupUserId":"0003f61bdfc60b764dbea9ff251b27452272",
            "label":"Adidas, Nike, Patagonia",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32104064,
            "name":"Grooming",
            "nickname":"Grooming",
            "userId":"00030c7c995eb8e9453e8b3582d3487319ae",
            "image":"http://image11.beso-images.com/beso/personas/32104064_10.jpg",
            "groupUserId":"00032aea115491bd43b8bb92c38a3afe92d3",
            "label":"Kiehl's, Anthony Logistics, LAB Series",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         }
      ],
      "Babies & Kids":[
         {
            "id":33467623,
            "name":"Babies",
            "nickname":"babystuff",
            "userId":"0003cfc41a9d83874a18a3eed4157437b01d",
            "image":"http://image14.beso-images.com/beso/personas/33467623_10.jpg",
            "groupUserId":"000379e090244b04489c96b99c4333817b4f",
            "label":"Oeuf, Dwell, Makie",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32104012,
            "name":"Little Boy",
            "nickname":"BoyChild",
            "userId":"00032cecf30149d34431b25874fdf612fab7",
            "image":"http://image12.beso-images.com/beso/personas/32104012_10.jpg",
            "groupUserId":"00036ed9c40d46ca4ded85197f46dd8bbb43",
            "label":"babyGap, Appaman, Ralph Lauren",
            "gender":"male",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         },
         {
            "id":32104041,
            "name":"Little Girl",
            "nickname":"GirlChild",
            "userId":"0003dbb3fad86ac149adb2880e49de4f64ff",
            "image":"http://image13.beso-images.com/beso/personas/32104041_10.jpg",
            "groupUserId":"000336f7fc3cc99f48c886b361daa3da0e54",
            "label":"Mini Rodini, J.Crew, Little Marc Jacobs",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         }
      ],
      "Home":[
         {
            "id":32104050,
            "name":"Home",
            "nickname":"HomeStuff",
            "userId":"0003967371a966a344468c53c5ea3bba92a7",
            "image":"http://image14.beso-images.com/beso/personas/32104050_10.jpg",
            "groupUserId":"0003b54dd9df167c46c5ad53411c305ce4b5",
            "label":"CB2, Knoll, West Elm",
            "gender":"female",
            "relations":[

            ],
            "objectType":"ACCOUNT"
         }
      ]
   }
}]
*/

var data = [{"id":32103036,"name":"Classic","nickname":"MrsClassic","userId":"0003e89c8f3a81fe4f3b8ef3cfef8eb33aae","image":"http://image13.beso-images.com/beso/personas/32103036_10.jpg","groupUserId":"000362d4ab33ac9249fc84b0705b69b8c499","label":"Theory, Reiss, Club Monaco","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32102707,"name":"Polished Casual","nickname":"PolishedCasual","userId":"0003493035b612a04df7944cdd9b2e210e7a","image":"http://image10.beso-images.com/beso/personas/32102707_10.jpg","groupUserId":"0003434ed6f2fe444c738da4dd1477cce083","label":"J Brand, Madewell, Vince","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103408,"name":"Preppy","nickname":"MrsPreppy","userId":"0003ede96731bf484393bd5a0068f5e2fe07","image":"http://image14.beso-images.com/beso/personas/32103408_10.jpg","groupUserId":"0003f7b299e100e443dfa1f9bbc91e0902c8","label":"J. Crew, Chance, Lands' End Canvas","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103003,"name":"Romantic Feminine","nickname":"RomanticFeminine","userId":"00032d42a6ed91214ba0b34d1cefddee6c01","image":"http://image12.beso-images.com/beso/personas/32103003_10.jpg","groupUserId":"00033e78ad9d239f41d5a0da087b6c8a6ed6","label":"Temperley, Diane von Furstenberg, Milly","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103526,"name":"Glam","nickname":"MrsGlam","userId":"0003a83d9466a6d24f0c971bcd90701af1b3","image":"http://image12.beso-images.com/beso/personas/32103526_10.jpg","groupUserId":"00033f68501042c64c188e6fec78a4ec322e","label":"Herve Leger, Dolce & Gabanna, Forever 21","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103422,"name":"Bohemian","nickname":"MrsBohemian","userId":"0003ee0084197a5c46bd9ec70684ace241dd","image":"http://image10.beso-images.com/beso/personas/32103422_10.jpg","groupUserId":"000329f8aebc8eb74756bfffe8380a33202c","label":"Free People, Isabel Marant, Antik Batik","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103515,"name":"Rocker","nickname":"MrsRocker","userId":"0003806bcd73a99c4c2691b5e08f1943eaa5","image":"http://image11.beso-images.com/beso/personas/32103515_10.jpg","groupUserId":"0003c9b5560e3545462a977c55d3d4ab144b","label":"Rick Owens, Allsaints Spitalfields, Cheap Monday","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32102957,"name":"Avant Garde","nickname":"Elisssseeeeeeee","userId":"0003273fa50e69ea44589fda79998c39187a","image":"http://image11.beso-images.com/beso/personas/32102957_10.jpg","groupUserId":"0003141587cc3c3e48c28639f2880978b048","label":"Suno, Zara, A Detacher","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32104071,"name":"Beauty","nickname":"BeautyBeso","userId":"0003c2b3b70add554291b90c2fa4080515dc","image":"http://image10.beso-images.com/beso/personas/32104071_10.jpg","groupUserId":"0003db7bc8c542f34137834075c9aac8bb24","label":"Nars, Bobbi Brown, Aveda","relations":[],"objectType":"ACCOUNT"}];


json2csv({data: data, fields: ['id', 'name', 'nickname', 'userId']}, function(err, csv) {
  if (err) console.log(err);
  fs.writeFile('file.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });
});