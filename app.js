// @TODO: YOUR CODE HERE!

//This function returns a Promise with the data readed from the CSV file
let getData = () => {
  return new Promise((resolve, reject) => {
    var data = d3.csv("data.csv", type);
    if (data == undefined) {
      reject("There was an erro reading the CVS file");
      return false;
    }
    resolve(data);
  });
};

//Call getData for get data and create the chart
getData()
  .then((data) => {
    //Here we create the scatter chart

    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 30, bottom: 50, left: 60 },
      width = 900 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // append the svg object to the div #scatter of the page
    var svg = d3
      .select("#scatter")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var newData = [];
    //Removing the last item that represent the columns of the CSV file
    for (var i = 0; i < data.length - 1; i++) {
      newData.push(data[i]);
    }

    console.log(newData);

    //Adding X Axis
    var x = d3
      .scaleLinear()
      .domain(d3.extent(newData, (d) => +d.poverty))
      .range([0, width]);
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Adding Y axis
    var y = d3
      .scaleLinear()
      .domain(d3.extent(newData, (d) => +d.healthcare))
      .range([height, 0]);
    svg.append("g").call(d3.axisLeft(y));

    //Creating plots
    svg
      .append("g")
      .selectAll("dot")
      .data(newData)
      .enter()
      .append("circle")
      .attr("cx", function (d) {
        return x(d.poverty);
      })
      .attr("cy", function (d) {
        return y(d.healthcare);
      })
      .attr("r", 15)
      .style("fill", "lightblue");

    //Adding labels to circles
    svg
      .append("g")
      .selectAll("text")
      .data(newData)
      .enter()
      .append("text")
      .text(function (d) {
        return d.abbr;
      })
      .attr("x", function (d) {
        return x(d.poverty - 0.12);
      })
      .attr("y", function (d) {
        return y(d.healthcare - 0.15);
      })
      .attr("font-size", "10px")
      .attr("stroke", "black")
      .attr("text-color", "white")
      .attr("text-align", "center");

    //Adding X Axis Title
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("x", width)
      .attr("y", height + margin.top + 20)
      .text("Poverty Percentage (%)");

    //Adding Y Axis Title
    svg
      .append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left + 20)
      .attr("x", -margin.top)
      .text("Healtcare Percentage (%)");
  })
  .catch((error) => console.error(error));

function type(d) {
  d.healthcare = +d.healthcare;
  d.poverty = +d.poverty;
  return d;
}
/* // Add X axis
var x = d3.scaleLinear().domain(d3.extent(xValues)).range([0, width]);
svg
  .append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear().domain(d3.extent(yValues)).range([height, 0]);
svg.append("g").call(d3.axisLeft(y));

svg
  .append("g")
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function (d) {
    return x(+d.healthcare);
  })
  .attr("cy", function (d) {
    return y(+d.poverty);
  })
  .attr("r", 1.5)
  .style("fill", "#69b3a2");
 */
