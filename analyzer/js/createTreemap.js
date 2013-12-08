var createTreemap = function(containerId, selectOptions, data) {
    var conceptTree = data,
        w = 1000 - 80,
        h = 800 - 180,
        x = d3.scale.linear().range([0, w]),
        y = d3.scale.linear().range([0, h]),
        root = conceptTree,
        node = root,

        treemap = d3.layout.treemap()
            .round(false)
            .size([w, h])
            .sticky(true)
            .value(function (d) {
                return d[selectOptions[0].val];
            }),

        svg = d3.select("#" + containerId).append("div")
            .attr("class", "chart")
            .style("width", w + "px")
            .style("height", h + "px")
            .append("svg:svg")
            .attr("width", w)
            .attr("height", h)
            .append("svg:g")
            .attr("transform", "translate(.5,.5)"),

        nodes = treemap.nodes(root)
            .filter(function (d) {
            	return true;
                //return !d.children;
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


        var cell = svg.selectAll("g")
            .data(nodes)
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("click", function (d) {
                return zoom(node == d.parent ? root : d.parent);
            });
            
    $("#" + containerId).append($('<select></select>').attr('id', 'sizeBy'));
    
    selectOptions.forEach(function(option) {
        $('#sizeBy').append($('<option></option>')
            .text(option.name)
            .attr('value', option.val)
        );
    });

    cell.append("svg:rect")
        .attr("width", function (d) {
                return d.dx;
            })
        .attr("height", function (d) {
                return d.dy;
            })
        .style("fill", function(d) { 
            return color(d);
        })
        // .style("fill", function (d) {
        //         if (d.color) {
        //             return d.color;
        //         } else {
        //             return "red";
        //         }
        //     })        
        .style("stroke", function (d) {
                return "black";
            });

    cell.append("title")
        .text(function (d) {
                return d.name;
            });

    cell.append("svg:text")
        .attr("x", function (d) {
                return d.dx / 2;
            })
        .attr("y", function (d) {
                return d.dy / 2;
            })
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(function (d) {
                return d.name;
            })
        .style("opacity", function (d) {
                d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0;
            });

    d3.select(window).on("click", function () {
            zoom(root);
        });

    d3.select("#sizeBy").on("change", function () {
            console.log(this.value);
            treemap.value(accessors[this.value]).nodes(root);
            zoom(node);
        });

    var accessors = {
            votes: function (d) {
                    return d.votes;
                },

            purchases: function (d) {
                    return d.purchases;
                },

            posts: function (d) {
                    return d.posts;
                },

            category: function (d) {
                    return 1;
                },
            rating: function (d) {
            	    return d.rating; 
                }
        };

    var zoom = function (d) {
        var kx = w / d.dx, ky = h / d.dy;
        x.domain([d.x, d.x + d.dx]);
        y.domain([d.y, d.y + d.dy]);

        var t = svg.selectAll("g.cell").transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .attr("transform", function (d) {
                    return "translate(" + x(d.x) + "," + y(d.y) + ")";
                });

        t.select("rect")
            .attr("width", function (d) {
                    return kx * d.dx;
                })
            .attr("height", function(d) {
                    return ky * d.dy;
                })

        t.select("text")
            .attr("x", function (d) {
                    return kx * d.dx / 2;
                })
            .attr("y", function (d) {
                    return ky * d.dy / 2;
                })
            .style("opacity", function (d) {
                    return kx * d.dx > d.w ? 1 : 0;
                });

        node = d;
        d3.event.stopPropagation();
    };
}