//when submitted
var loc = $(location).attr('href');
var changeSpot = loc.lastIndexOf('8000');
var apiPort = '3000/';
var transform = [];
var skipCount = 0;
var itemsPerPage = 10;

function checkButton(){
    console.log($("#item").text() !=="[item]" && $("#format").text() !=="[format]" && ($("#items-per-page").val() === "" || $("#items-per-page").val()%1 ===0) );
    if($("#item").text() !=="[item]" && $("#format").text() !=="[format]" && ($("#items-per-page").val() === "" || $("#items-per-page").val()%1 ===0) ){
        $('#test1').prop('disabled', false);
    }
    else{
        $('#test1').prop('disabled', true);
    }

    if($("#format").text() !== "HTML" && $("#format").text() !== "CSV" && $("#format").text() !== "JSON"){
        $("#items-per-page").css('display', 'none');
    }
    else{
        $("#items-per-page").css('display', 'inline');
    }
}

function getAllTheProducts(query) {
    var data = [],
        skip = 0,
        maxPerQuery = 100;
        page = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
            apiPort + "products?" + query + "&limit=" + maxPerQuery));

    while (page.length !== 0) {
        data = data.concat(page);
        page = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
            apiPort + item.toLowerCase() + "?" + query + "&limit=" + maxPerQuery + "&skip=" + maxPerQuery*++skip));
    }

    return data;
}

checkButton();

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
            var data = [],
                maxPerQuery = 100,
                parsedData = {
                    "name": "Products",
                    "children": [],
                    "size": 0
                },
                categories = {},
                page
                skip = 0;

            data = [];
            page = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
                apiPort + item.toLowerCase() + "?" + query + "&limit=" + maxPerQuery));

            while (page.length !== 0) {
                data = data.concat(page);
                page = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
                    apiPort + item.toLowerCase() + "?" + query + "&limit=" + maxPerQuery + "&skip=" + maxPerQuery*++skip));
            }

            data.forEach(function (product) {
                var total=0;
                parsedData.size++;
                //get rating  
                votes = jQuery.parseJSON(httpGet(loc.substring(0,changeSpot) + 
                    apiPort + "votes?productId=" + product._id + "&limit=" + maxPerQuery));

                for(i in votes) {
                    total += votes[i].rating;
                }
                product.rating = total/votes.length;

                if (categories[product.category.name] !== undefined) {
                    parsedData.children[categories[product.category.name]].size++;
                    parsedData.children[categories[product.category.name]].children.push({
                        "name": product.name,
                        "rating": product.rating,
                        "size": 1
                    });
                } else {
                  categories[product.category.name] = parsedData.children.length;
                  parsedData.children.push({
                      "name": product.category.name,
                      "children": [{
                        "name": product.name,
                        "rating": product.rating,
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
            if (item === "USERS") {
                var data = getTestData();
                    selectOptions = [
                        {name: 'Votes', val: 'votes'},
                        {name: 'Purchases', val: 'purchases'},
                        {name: 'Posts', val: 'posts'},
                        {name: 'Category Size', val: 'category'}
                    ];

                createTreemap("visiContainer", selectOptions, data);
            } else if (item === "PRODUCTS") {
                var data = createTestData();
                    console.log(data);
                    selectOptions = [
                        {name: 'Size', val: 'size'},
                        {name: 'Rating', val: 'rating'}
                    ];
                createTreemap("visiContainer", selectOptions, data);
            }
 
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
    checkButton();
};

var selectedButtonItem = function(value){
    $("#item").html(value);
    $("#dropdown-1").css('display', 'none');
    $(document).find('.dropdown-open').removeClass('dropdown-open');
    checkButton();
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