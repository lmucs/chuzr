$(function() {
	var categories = ["electronics", "apparel", "recreation", "tools"];
	
	categories.forEach(function(category){
		$("#categoryTable").append($("<tr></tr>")
			.append($("<td></td>")
				.text(category)
			)
		)
	});
})