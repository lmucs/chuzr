//when submitted
var loc = $(location).attr('href');
var changeSpot = loc.lastIndexOf('8000');
var apiPort = '3000/';
var transform = [];
var skipCount = 0;
var itemsPerPage = 10;

$("#test1").click( function() {
    var item = $("#item").text(),
        format = $("#format").text(),
        search = $("#filter").val(),
        perPage = $("#items-per-page").val();

     
     skipCount = 0;
     var query = "";

    if(search !== ""){
         query = "name=" + search;
    }

    if(perPage !== "" && perPage%1 ===0){
        itemsPerPage = Number(perPage);

    }

    if(item === "[item]"){
        alert("please select an item you want to see.");
    }
    if(format === "[format]"){
        alert("please select a format you want to see.");
    }
     

    $("#visiContainer").empty();
    if(item !== null && format !== null){
        var dataJSON = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + apiPort + item.toLowerCase() + "?" +  query + "&limit=" + itemsPerPage));
   

        if(format === "HTML"){
            $("#visiContainer").append(
                $("<ul></ul>").attr("id", "list"),
                $("<button type='button' >Previous Page</button>").attr("id","last-page"),
                $("<button type='button' >Next Page</button>").attr("id","next-page")    
            );
            
            transform = [];

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

            $("#list").append(json2html.transform(dataJSON,transform));
            $("#next-page").click( function() {
                skipCount += Number(itemsPerPage);
                var data = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + apiPort + item.toLowerCase() + "?" + query + "&skip=" + skipCount+ "&limit=" + itemsPerPage));
                if(data.length === 0){
                    skipCount -= Number(itemsPerPage);
                    alert("End of data! Go backwards!");
                 }
                $("#list").empty();
                $("#list").append(json2html.transform(data,transform));
                console.log(skipCount);
                $("html, body").animate({ scrollTop: 0 }, "slow");

            });
            $("#last-page").click( function() {
                skipCount -= Number(itemsPerPage);
                var data = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + apiPort + item.toLowerCase() + "?" + query + "&skip=" + skipCount+ "&limit=" + itemsPerPage));
                if(skipCount < 0){
                    skipCount += Number(itemsPerPage);
                    alert("Beginning of data! Go forwards!");
                }
                $("#list").empty();
                $("#list").append(json2html.transform(data,transform));
                console.log(skipCount);
                $("html, body").animate({ scrollTop: 0 }, "slow");

                
            });
        }


        else if(format === "CIRCLEPACK") {
            //Modify favorites data for circle pack visualization
            var data = getFavorites(),
                maxPerQuery = 100,
                parsedData = {
                    "name": "Favorites",
                    "children": [],
                    "size": 0
                },
                categories = {},
                page
                skip = 0;

            console.log(data);
            data = [];
            console.log(loc.substring(0,changeSpot) + 
                apiPort + item.toLowerCase() + "?limit=" + maxPerQuery);
            page = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
                apiPort + item.toLowerCase() + "?limit=" + maxPerQuery));

            //while (page.length !== 0) {
            while (skip<50) {
                data = data.concat(page);
                page = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
                    apiPort + item.toLowerCase() + "?limit=" + maxPerQuery + "&skip=" + maxPerQuery*++skip));
            }

            console.log(data);

            data.forEach(function (product) {
            //data.objects.forEach(function (product) {
              parsedData.size++;
                if (categories[product.category.name]) {
                // if (categories[product.categoryName]) {
                    // parsedData.children[categories[product.categoryName]].size++;
                    // parsedData.children[categories[product.categoryName]].children.push({
                    parsedData.children[categories[product.category.name]].size++;
                    parsedData.children[categories[product.category.name]].children.push({
                        "name": product.title,
                        "size": 1
                    });
                } else {
                  //categories[product.categoryName] = parsedData.children.length;
                  categories[product.category.name] = parsedData.children.length;
                  parsedData.children.push({
                      //"name": product.categoryName,
                      "name": product.category.name,
                      "children": [{
                        "name": product.title,
                        "size": 1
                      }],
                      "size": 1
                  });
                }
            });

            console.log(parsedData);
                
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
                    console.log("csv");
                    var data = dataJSON;
                    if(data == '')
                        return;
                    
                    JSONToCSV(data, item, true);
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
};


$("#next-page").click( function() {
    alert("hi");
    if(MAX_ITEMS  < skipCount + itemsPerPage){
        alert("no more items to show");
    }else{
        skipCount += itemsPerPage;
        var data = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + apiPort + currentItem.toLowerCase() + query + "&skip=" + skipCount));
        $("#list").append(json2html.transform(data,transform));
        if(data.length === 0){
            skipCount -= itemsPerPage;
        }
        console.log(skipCount);
    }
});