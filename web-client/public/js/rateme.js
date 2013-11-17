//game.js

$(function() {
	var httpGet = function(theUrl) {
		    var xmlHttp = null;

		    xmlHttp = new XMLHttpRequest();
		    xmlHttp.open( "GET", theUrl, false );
		    xmlHttp.send( null );
		    return xmlHttp.responseText;
		},
		products = jQuery.parseJSON(httpGet("http://localhost:3000/products")),
		testImage = "http://www.placehold.it/200x300";



	$('#rate').click(function() {
		$("#rating > h1").text("0");
		$("#slider").slider("setValue", 0);

		// $.ajax({
		//        type: 'POST',
		//        url: 'http://localhost:3000/votes',
		//        data: JSON.stringify(),
		//        contentType: 'application/json',
		//        dataType: 'json',
		//        accept: 'application/json',
		//        complete: function (jqXHR, textStatus) {   

		//        }
		//    });
	});


	$('.slider').slider('setValue', 0)
		.on('slide', function(ev){
     		$('#rating > h1').text(ev.value);
     	});
})