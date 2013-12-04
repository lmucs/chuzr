//when submitted
var loc = $(location).attr('href');
var changeSpot = loc.lastIndexOf('8000');
var apiPort = '3000/'

$("#test1").click( function() {
    var item = $("#item").text(),
        format = $("#format").text(),
        search = $("#filter").val();

        var query = "";

        if(search !== ""){
            query = "?name=" + search;
        }

        var dataJSON = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + apiPort + item.toLowerCase() + query));
    $("#iframe").attr('src','http://www.yahoo.com');
    if(item === "[item]"){
        alert("please select an item you want to see.");
    }
    if(format === "[format]"){
        alert("please select a format you want to see.");
    }
    
    $("#visiContainer").empty();
    if(item !== null && format !== null){

        if(format === "HTML"){
            $("#visiContainer").append(
                $("<ul></ul>").attr("id", "list")
            );

            var transform = [];

            if(item === "USERS"){
              transform = [
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
            }
            else if (item === "PRODUCTS") {
              transform = [
                {"tag":"li","html": "${name}"},
                {"tag":"ul","children":[
                    {"tag":"li","html": "brand: ${brand} "},
                    {"tag":"li","html": "description: ${description}"},
                    {"tag":"li","html": "url: ${url} "},
                    {"tag":"li","html": "shopzillaID: ${shopzillaId} "},
                    {"tag":"li","html": "category"},
                    {"tag":"ul","children":[
                        {"tag":"li","html": "name: ${category.name}"},
                        {"tag":"li","html": "id: ${category.id}"}
                    ]},
                    {"tag":"li","html": "_id: ${_id} "},
                    {"tag":"li","html": "related: ${related}"},
                  ]}
              ];

            }
            else if(item === "VOTES"){
               transform = [
                {"tag":"li","html": "${userId}, ${productID}"},
                {"tag":"ul","children":[
                    {"tag":"li","html": "rating: ${rating}"},
                    {"tag":"li","html": "timestamp: ${timestamp} "},
                    {"tag":"li","html": "active: ${active}"},
                   
                  ]}
              ];
            }
            else if(item === "COUPONS"){
               transform = [
                {"tag":"li","html": "${issuer}, ${value}"},
                {"tag":"ul","children":[
                    {"tag":"li","html": "promoCode: ${promoCode}"},
                    {"tag":"li","html": "exprationDate: ${expirationDate} "},
                    {"tag":"li","html": "imageURL: ${imageURL}"},
                   
                  ]}
              ];
            }



            //TODO get data from a Get call and extract desired classes to denormalize
                
            var data = [{"id":32103036,"name":"Classic","nickname":"MrsClassic","userId":"0003e89c8f3a81fe4f3b8ef3cfef8eb33aae","image":"http://image13.beso-images.com/beso/personas/32103036_10.jpg","groupUserId":"000362d4ab33ac9249fc84b0705b69b8c499","label":"Theory, Reiss, Club Monaco","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32102707,"name":"Polished Casual","nickname":"PolishedCasual","userId":"0003493035b612a04df7944cdd9b2e210e7a","image":"http://image10.beso-images.com/beso/personas/32102707_10.jpg","groupUserId":"0003434ed6f2fe444c738da4dd1477cce083","label":"J Brand, Madewell, Vince","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103408,"name":"Preppy","nickname":"MrsPreppy","userId":"0003ede96731bf484393bd5a0068f5e2fe07","image":"http://image14.beso-images.com/beso/personas/32103408_10.jpg","groupUserId":"0003f7b299e100e443dfa1f9bbc91e0902c8","label":"J. Crew, Chance, Lands' End Canvas","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103003,"name":"Romantic Feminine","nickname":"RomanticFeminine","userId":"00032d42a6ed91214ba0b34d1cefddee6c01","image":"http://image12.beso-images.com/beso/personas/32103003_10.jpg","groupUserId":"00033e78ad9d239f41d5a0da087b6c8a6ed6","label":"Temperley, Diane von Furstenberg, Milly","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103526,"name":"Glam","nickname":"MrsGlam","userId":"0003a83d9466a6d24f0c971bcd90701af1b3","image":"http://image12.beso-images.com/beso/personas/32103526_10.jpg","groupUserId":"00033f68501042c64c188e6fec78a4ec322e","label":"Herve Leger, Dolce & Gabanna, Forever 21","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103422,"name":"Bohemian","nickname":"MrsBohemian","userId":"0003ee0084197a5c46bd9ec70684ace241dd","image":"http://image10.beso-images.com/beso/personas/32103422_10.jpg","groupUserId":"000329f8aebc8eb74756bfffe8380a33202c","label":"Free People, Isabel Marant, Antik Batik","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32103515,"name":"Rocker","nickname":"MrsRocker","userId":"0003806bcd73a99c4c2691b5e08f1943eaa5","image":"http://image11.beso-images.com/beso/personas/32103515_10.jpg","groupUserId":"0003c9b5560e3545462a977c55d3d4ab144b","label":"Rick Owens, Allsaints Spitalfields, Cheap Monday","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32102957,"name":"Avant Garde","nickname":"Elisssseeeeeeee","userId":"0003273fa50e69ea44589fda79998c39187a","image":"http://image11.beso-images.com/beso/personas/32102957_10.jpg","groupUserId":"0003141587cc3c3e48c28639f2880978b048","label":"Suno, Zara, A Detacher","gender":"female","relations":[],"objectType":"ACCOUNT"},{"id":32104071,"name":"Beauty","nickname":"BeautyBeso","userId":"0003c2b3b70add554291b90c2fa4080515dc","image":"http://image10.beso-images.com/beso/personas/32104071_10.jpg","groupUserId":"0003db7bc8c542f34137834075c9aac8bb24","label":"Nars, Bobbi Brown, Aveda","relations":[],"objectType":"ACCOUNT"}];

            document.getElementById('list').innerHTML = json2html.transform(dataJSON,transform);
        }
        else if(format === "CIRCLEPACK") {
            //Modify favorites data for circle pack visualization
            var data = getFavorites(),
                parsedData = {
                    "name": "Favorites",
                    "children": [],
                    "size": 0
                },
                categories = {};

            data.objects.forEach(function (product) {
              parsedData.size++;
                if (categories[product.categoryName]) {
                    parsedData.children[categories[product.categoryName]].size++;
                    parsedData.children[categories[product.categoryName]].children.push({
                        "name": product.title,
                        "size": 1
                    });
                } else {
                  categories[product.categoryName] = parsedData.children.length;
                  parsedData.children.push({
                      "name": product.categoryName,
                      "children": [{
                        "name": product.title,
                        "size": 1
                      }],
                      "size": 1
                  });
                }
            });
                
            createCirclePack(parsedData, "#visiContainer");
        } else if(format === "JSON"){
          var json = "";
          
          dataJSON.forEach(function(thing){
            json += JSON.stringify(thing) + "\n \n";
          })
          
          $("#visiContainer").append(json);
        } else if (format === "TREEMAP") {
            var data,
                selectOptions,
                renderTreemap = function (dataType) {
                    if (dataType === "USERS") { 
                        data = getTestData();
                        selectOptions = [
                            {name: 'Votes', val: 'votes'},
                            {name: 'Purchases', val: 'purchases'},
                            {name: 'Posts', val: 'posts'},
                            {name: 'Category Size', val: 'category'}
                        ];
                        createTreemap("visiContainer", selectOptions, data);
                    } else if (dataType === "PRODUCTS") {
                        data = createTestData();
                        selectOptions = [
                            {name: 'Size', val: 'size'},
                            {name: 'Rating', val: 'rating'}
                        ];
                        createTreemap("visiContainer", selectOptions, data);
                    }
                };
            
            renderTreemap(item);  
        } else if(format === "CSV") {
                // Need to implement code for actual download button.
                // $('#test1').click(function(){})
                $('#test1').click(function(){
                    var data = dataJSON;
                    if(data == '')
                        return;
                    
                    JSONToCSV(data, item, true);
                });
        }
    }
    
});

["PRODUCTS", "COUPONS", "USERS", "VOTES"].forEach(function (type) {
    $("#" + type).click(function() {
        selectedButtonItem(type);
    });
});

["JSON", "CSV", "TREEMAP", "CIRCLEPACK", "HTML"].forEach(function (type) {
    $("#" + type).click(function() {
        selectedButtonFormat(type);
    });
});

var selectedButtonFormat = function(value){
    $("#format").html(value);
    $("#dropdown-2").css('display', 'none');
    $(document).find('.dropdown-open').removeClass('dropdown-open');
};

var selectedButtonItem = function(value){
    $("#item").html(value);
    $("#dropdown-1").css('display', 'none');
    $(document).find('.dropdown-open').removeClass('dropdown-open');
}

$("#format").click(function(event, dropdownData) {
  
});

function httpGet(theUrl)
{
    var xmlHttp = null;

    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

