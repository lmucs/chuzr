var w = 1280,
    h = 800,
    r = 720,
    x = d3.scale.linear().range([0, r]),
    y = d3.scale.linear().range([0, r]),
    node,
    root;

var pack = d3.layout.pack()
    .size([r, r])
    .value(function(d) {
        return d.size;
    });

var vis = d3.select("body").insert("svg:svg", "h2")
    .attr("width", w)
    .attr("height", h)
    .append("svg:g")
    .attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");
    
var color = function(node) {
	var rating = node.rating,
	    b = 0,
        r = 255*2*(1-rating),
        g = 255*2*rating;
        
    if (r > 255) {
        r = 255;
    }
    if (g > 255) {
        g = 255;
    }

	return "rgb(" + Math.floor(r) + "," + Math.floor(g) + "," + Math.floor(b) + ")";
}

//d3.json("circlePackTestData.json", function(data) {
createTestData(function (data) {    
    node = root = data;
    var nodes = pack.nodes(root);

    vis.selectAll("circle")
        .data(nodes)
        .enter().append("svg:circle")
        .attr("class", function(d) { 
            return d.children ? "parent" : "child"; 
        })
        .attr("cx", function(d) { 
            return d.x; 
        })
        .attr("cy", function(d) { 
            return d.y;
        })
        .attr("r", function(d) { 
            return d.r;
        })
        .style("fill", function(d) { 
            return color(d);
        })        
        //.style("fill", "rgb(255,0,0)")
        .on("click", function(d) { 
            return zoom(node == d ? root : d);
        });

    vis.selectAll("text")
        .data(nodes)
        .enter().append("svg:text")
        .attr("class", function(d) { 
            return d.children ? "parent" : "child";
        })
        .attr("x", function(d) { 
            return d.x;
        })
        .attr("y", function(d) { 
            return d.y;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("opacity", function(d) { 
            return d.r > 20 ? 1 : 0;
        })
        .text(function(d) { 
            return d.name;
        });

    d3.select(window).on("click", function() {
        zoom(root);
    });
});

function zoom(d, i) {
    var k = r / d.r / 2;
    x.domain([d.x - d.r, d.x + d.r]);
    y.domain([d.y - d.r, d.y + d.r]);
 
    var t = vis.transition()
        .duration(d3.event.altKey ? 7500 : 750);

    t.selectAll("circle")
        .attr("cx", function(d) { 
            return x(d.x);
        })
        .attr("cy", function(d) { 
            return y(d.y);
        })
        .attr("r", function(d) { 
            return k * d.r;
        });

    t.selectAll("text")
        .attr("x", function(d) { 
            return x(d.x);
        })
        .attr("y", function(d) { 
            return y(d.y);
        })
        .style("opacity", function(d) { 
            return k * d.r > 20 ? 1 : 0;
        });

    node = d;
    d3.event.stopPropagation();
}

function createTestData(callback) {
    var data = {
            "name": "products",
            "children": [],
            "size": 10000,
            "level": 0,
            "rating": Math.random()
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
                    "rating": Math.random()
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
            "rating": Math.random()
        };
        
        child.size = Math.floor(Math.random() * 10000 / Math.pow(2, child.level)) 
            + 0.5 * 10000 / Math.pow(2, child.level);
            
        child.children = addRandomChildren(child);
        
        data.children.push(child);
    });
    
    callback(data);
}