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
    
createCirclePack(parsedData, "body");