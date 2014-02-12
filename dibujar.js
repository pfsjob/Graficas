var datos = [];
var xA;
var yA;
//var objeto = new Object();
var eX=false;
var eY=false;
//
var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var LinesGroup = null;
var svg = null;

function dibuja(eje){
	var seleccion=document.getElementById(eje);
	seleccion=seleccion.options[seleccion.selectedIndex].value;
	if(eje=="X"){
		xA=seleccion;
		eX = true;
	}
	if(eje=="Y"){
		yA=seleccion;
		eY = true;
	}
	if(eX==true && eY==true){
		grabar();
	}
		
}

function grabar(){
	d3.json("datos.json",function(error,data){
			for(var i=0; i < data[xA].length; i++){
				var objeto = new Object();
				objeto.ejex = data[xA][i];
				objeto.ejey = data[yA][i];
				datos.push(objeto);
			}
		//console.log(datos);
		trazar();
	});
}

function trazar(){
	//console.log("TENGO LOS DATOS"+datos);
	var x = d3.scale.linear()
	.range([0, width]);

	var y = d3.scale.linear()
		.range([height, 0]);
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.ticks(15)
		.orient("bottom");
	
	var yAxis = d3.svg.axis()
		.scale(y)
		.ticks(15)
		.orient("left");
	
	var line = d3.svg.line()
	    .x(function(d) { return x(d.ejex); })
	    .y(function(d) { return y(d.ejey); });
	
	svg = d3.select('#chart').select('svg').select('g');
	if (svg.empty()) {
		svg = d3.select('#chart')
			.append('svg:svg')
				.attr('width', width + margin.left + margin.right)
				.attr('height', height + margin.top + margin.bottom)
				.attr('class', 'viz')
			.append('svg:g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	}	
	
	x.domain(d3.extent(datos, function(d) { return d.ejex; }));
	y.domain(d3.extent(datos, function(d) { return d.ejey; }));
	
	svg.append("svg:g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	
	svg.append("svg:g")
		.attr("class", "y axis")
		.call(yAxis)
	.append("text")
	  .attr("transform", "rotate(-90)")
	  .attr("y", 6)
	  .attr("dy", ".71em")
	  .style("text-anchor", "end")
	  .text("Lineas a–adidas");
	
	if (!LinesGroup) {
		LinesGroup = svg.append('svg:g');
	}
	
		LinesGroup.append("path")
	      .datum(datos)
	      .attr("class", "line")
	  	  .attr("d", line);
}