var createCirclePack = function(parsedData, selector) {
    //Display categorizations in circle pack visualization
    var w = 800,
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

    var color = function(node) {
        var rating = node.rating / 10,
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

    
    var vis = d3.select(selector).insert("svg:svg", "h2")
        .attr("width", w)
        .attr("height", h)
        .append("svg:g")
        //.attr("transform", "translate(" + (w - r) / 2 + "," + (h - r) / 2 + ")");
        .attr("transform", "translate(0,0)");
    
    node = root = parsedData;
    var nodes = pack.nodes(root),
        minRadius = 100;
    
    vis.selectAll("circle")
        .data(nodes)
        .enter().append("svg:circle")
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.r; })  
        .style("fill", function(d) { 
            return color(d);
        }) 
        .on("click", function(d) { return zoom(node == d ? root : d); })
        .on("mouseover", function (d) {
            if(d.r <= minRadius) {
                $("#text_"+d.name.replace(/[ :.#,+&'"()\/!-]/g, '')).css({opacity:1});
            }
        })
        .on("mouseout", function (d) {
            if(d.r <= minRadius) {
                $("#text_"+d.name.replace(/[ :.#,+&'"()\/!-]/g, '')).css({opacity:0});
            }
        });

    vis.selectAll("text")
        .data(nodes)
        .enter().append("svg:text")
        .attr("class", function(d) { return d.children ? "parent" : "child"; })
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("id", function(d) {return "text_" + d.name.replace(/[ :.#,+&'"()\/!-]/g, '');})
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .style("opacity", function(d) { 
            return d.r > minRadius ? 1 : 0; 
        })
        .text(function(d) { return d.name; });
    
    d3.select(window).on("click", function() {
        zoom(root); 
    });
    
    
    function zoom(d, i) {
        var k = r / d.r / 2;
        x.domain([d.x - d.r, d.x + d.r]);
        y.domain([d.y - d.r, d.y + d.r]);
     
        var t = vis.transition()
            .duration(d3.event.altKey ? 7500 : 750);
    
        t.selectAll("circle")
            .attr("cx", function(d) { return x(d.x); })
            .attr("cy", function(d) { return y(d.y); })
            .attr("r", function(d) { return k * d.r; });
    
        t.selectAll("text")
            .attr("x", function(d) { return x(d.x); })
            .attr("y", function(d) { return y(d.y); })
            .style("opacity", function(d) { return k * d.r > minRadius ? 1 : 0; });
    
        node = d;
        d3.event.stopPropagation();
    }
}