//Modify personas data for circle pack visualization
var data = getPersonasIndex(),
    parsedData = {},
    getChildren = function(data) {
        parsedData.size = 0;
        parsedData.children = [];
        
    	for(key in data) {
    		var children = [];
    		data[key].forEach(function(user) {
    		    user.size = 1;
    		    children.push(user);
    		});
    		
    		parsedData.children.push({
    		   "name": key,
    		   "children": children,
    		   "size": children.length
    		});
    		parsedData.size += data[key].length;
    	}
    };

parsedData.name = "Personas By Category";
getChildren(data.personasByCategory);
createCirclePack(parsedData);