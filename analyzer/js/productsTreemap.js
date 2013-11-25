$(function () {
	var data,
	    selectOptions,
	    renderTreemap = function (dataType) {
        	if (dataType === "users") { 
                data = getTestData();
                selectOptions = [
                    {name: 'Votes', val: 'votes'},
                    {name: 'Purchases', val: 'purchases'},
                    {name: 'Posts', val: 'posts'},
                    {name: 'Category Size', val: 'category'}
                ];
                createTreemap("treemap", selectOptions, data);
        	} else if (dataType === "products") {
                data = createTestData();
                selectOptions = [
                    {name: 'Size', val: 'size'},
                    {name: 'Rating', val: 'rating'}
                ];
                createTreemap("treemap", selectOptions, data);
        	}
	    };
	
	$("#dataType").change(function() {
		$("#treemap").empty();
	    renderTreemap($("#dataType").val());
	});
	
    renderTreemap($("#dataType").val());
});

function getTestData() {
    var categories = ["0-9", "10-19", "20-29", "30-39", "40-49"],
        colors = ["red", "blue", "yellow", "green", "orange"],
        names = ["Francie", "Hana", "Zenobia", "Myong", "Laveta", "Carrie", "Jame", "Adell", "Rolando", "Kristan", "Chas", "Nia", "Adena", "Clarence", "Virgen", "Ethelene", "Fleta", "Myrtie", "Brandy", "Neta", "Sherwood", "Cristine", "Winifred", "Manie", "Kellee", "Evalyn", "Lorita", "Lavon", "Joaquina", "Loyce", "Jaye", "Eusebia", "Talisha", "Candy", "Jacques", "Lakeisha", "Ed", "Karin", "Melanie", "Leesa", "Porfirio", "Susie", "Miriam", "Yee", "Julieann", "Ernest", "Darcy", "Markita", "Jeanie", "Jenelle"],
        data = {
            name: "users",
            children: []
        };
        
    categories.forEach(function(cat, index){
       var thisCategory = {
               name: cat,
               color: colors[index],
               children: []
           },
           numChild = Math.floor(Math.random()*20+1),
           i;
       
       for(i=0; i<numChild; i++) {
           thisCategory.children.push({
               name: names[Math.floor(Math.random()*names.length)],
               votes: Math.floor(Math.random()*500),
               purchases: Math.floor(Math.random()*100),
               posts: Math.floor(Math.random()*50),
               color: colors[index]
           });
       }
       
       data.children.push(thisCategory);
    });
    return data;
};

function createTestData() {
    var data = {
            "name": "products",
            "children": [],
            "size": 10000,
            "level": 0,
            "rating": Math.floor(Math.random()*99+1)
        }, 
        addRandomChildren = function (parent) {
            var childrenNum = Math.floor(Math.random() * 10 / parent.level),
                children = [],
                child,
                i;
            
            for (i = 0; i < childrenNum; i++) {
                child = {
                    "name": "child_" + i,
                    "level": parent.level + 1,
                    "rating": Math.floor(Math.random()*99+1)
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
            "level": 1,
            "rating": Math.floor(Math.random()*99+1)
        };
        
        child.size = Math.floor(Math.random() * 10000 / Math.pow(2, child.level)) 
            + 0.5 * 10000 / Math.pow(2, child.level);
            
        child.children = addRandomChildren(child);
        
        data.children.push(child);
    });
    
    return data;
}