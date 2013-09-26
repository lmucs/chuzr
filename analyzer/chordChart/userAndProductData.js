var getUsersAndProducts = function() {
	    return [
            {
                "userCategory": "men",
                "color": "#FF0000",
                "votes": {
                    "0": 5,
                    "1": 2,
                    "2": 5,
                    "3": 5
                }
            },
            {
                "userCategory": "women",
                "color": "#00FF00",
                "votes": {
                    "0": 3,
                    "1": 5,
                    "2": 9
                }
            },
            {
                "userCategory": "children",
                "color": "#0000FF",
                "votes": {
                    "0": 3,
                    "1": 0,
                    "2": 8
                }
            },
            {
                "productCategory": "sports",
                "color": "#FFFF00",
                "id": 0
            },
            {
                "productCategory": "electronics",
                "color": "#FF00FF",
                "id": 1
            },
            {
                "productCategory": "clothes",
                "color": "#00FFFF",
                "id": 2
            },
            {
                "productCategory": "food",
                "color": "#AAAAAA",
                "id": 3
            }
        ];
    },

    getRelations = function() {
    	//Note: relations should be made from votes property in users
    	var relations = [
                [0,0,0,3,2,1,5],
                [0,0,0,3,1,3,8],
                [0,0,0,8,2,5,2],
                [3,3,8,0,0,0,0],
                [2,1,2,0,0,0,0],
                [1,3,5,0,0,0,0],
                [5,8,2,0,0,0,0]
        	],
        	usersAndProducts = getUsersAndProducts(),
        	total = relations.reduce(function(a,b) { return a.concat(b) }) // flatten array
                             .reduce(function(a,b) { return a + b }),
        	i,j;
    	
//    	relations = [];
//    	usersAndProducts.forEach(function(user) {
//    	    if(user.votes) {
//    	    	
//    	    }
//    	});
    	
    	//normalize
        relations.forEach(function(row, i) {
            row.forEach(function(elem, j) {
                relations[i][j] = elem/total;
            });
        });

    	
        return relations;
    }