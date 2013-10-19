var createTreemap = function(containerId, selectOptions, data) {
    var conceptTree = data,
        // Done with preprocessing, so now we render.
        // TODO clean up the code below
        w = 1200 - 80,
        // Height is based on the number of rows in the cube.
        // TODO Again still hacky.
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
                return !d.children;
            }),

        cell = svg.selectAll("g")
            .data(nodes)
            .enter().append("svg:g")
            .attr("class", "cell")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .on("click", function (d) {
                return zoom(node == d.parent ? root : d.parent);
            });
            
    $("#" + containerId).append($('<select></select>'));
    
    selectOptions.forEach(function(option) {
        $('select').append($('<option></option>')
            .text(option.name)
            .attr('value', option.val)
        );
    });

    cell.append("svg:rect")
        .attr("width", function (d) {
                return d.dx - 1;
            })
        .attr("height", function (d) {
                return d.dy - 1;
            })
        .style("fill", function (d) {
                return d.color;
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

    d3.select("select").on("change", function () {
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
                    return kx * d.dx - 1;
                })
            .attr("height", function(d) {
                    return ky * d.dy - 1;
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