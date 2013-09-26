//Short script to create some false data for the cluster pack visualization
//Run in cosnole and copy outputed json to circlePackTestData.json
var data = {
        "name": "products",
        "children": [],
        "size": 10000,
        "level": 0
    }, 
    addRandomChildren = function (parent) {
    	var childrenNum = Math.floor(Math.random() * 10 / parent.level),
    	    children = [],
    	    child,
    	    i;
    	
    	for (i = 0; i < childrenNum; i++) {
    		child = {
                "name": "child_" + i,
                "level": parent.level + 1
            };
            child.size = Math.floor(Math.random() * 10000 / Math.pow(2, child.level)) 
                         + 0.5 * 10000 / Math.pow(2, child.level);
            child.children = addRandomChildren(child);
    		children.push(child);
    	}
    	
    	return children;
    };

["Sports", "Aparel", "Electronics"].forEach(function (category) {
    var child = {
    	"name": category,
    	"level": 1
    };
    
    child.size = Math.floor(Math.random() * 10000 / Math.pow(2, child.level)) 
        + 0.5 * 10000 / Math.pow(2, child.level);
        
    child.children = addRandomChildren(child);
    
    data.children.push(child);
});

console.log(JSON.stringify(data));