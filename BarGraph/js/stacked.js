d3.json("./../dataFiles/json/stacked.json", function(data) {
 makeChart(data);
});
function makeChart(data){
/*var data =[
  {"Year": 1960,"Rural":20.0,"Urban":5.10},
  {"Year": 1961,"Rural":30.7,"Urban":10.8}
];*/
//console.log(data+"\n");
data.sort(function(a, b){ return d3.descending(a["Rural"]+a["Urban"], b["Rural"]+b["Urban"]); })
//console.log(data);
var xData = ["Rural", "Urban"];

var margin = {top: 20, right: 50, bottom: 30, left: 50},
        width = 1400 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .35);

var y = d3.scale.linear()
        .rangeRound([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
$("svg").remove();
var svg = d3.select("#records_graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var dataIntermediate = xData.map(function (c) {
    return data.map(function (d) {
        return {x: d.Year, y: d[c]};
    });
});

var dataStackLayout = d3.layout.stack()(dataIntermediate);

x.domain(dataStackLayout[0].map(function (d) {
    return d.x;
}));

y.domain([0,
    d3.max(dataStackLayout[dataStackLayout.length - 1],
            function (d) { return d.y0 + d.y;})
    ])
  .nice();

var layer = svg.selectAll(".stack")
        .data(dataStackLayout)
        .enter().append("g")
        .attr("class", "stack")
        .style("fill", function (d, i) {
            return color(i);
        });

layer.selectAll("rect")
        .data(function (d) {
            return d;
        })
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.x);
        })
        .attr("y", function (d) {
            return y(d.y + d.y0);
        })
        .attr("height", function (d) {
            return y(d.y0) - y(d.y + d.y0);
        })
        .attr("width", x.rangeBand());

svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
}
