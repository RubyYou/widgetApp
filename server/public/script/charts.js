/* Here start the bar chart */
	var w = 300;
		h = 250;
		padding = 5;
		
	var bardata = [ 10,15,22,30,8,17,26,3];
	var aveBar = 8; /* the data for average point or something to evaluate! */
	
	var yScale = d3.scale.linear()
						 .domain([0, 30]) /*should change to D3.max method to get the max one*/
						 .range([0, h]);

	var barColor = d3.scale.linear()
						 .domain([0,30]) /*should change to D3.max method to get the max one*/
						 .range(["#46E6FF", "#08c"]);
	
	var yAxis = d3.svg.axis()
					  .scale(yScale)
					  .orient("left")
					  .ticks(3);
		
	var bars = d3.select(".bars")
	  			 .append("svg")
	  			 .attr("width", w)
	  			 .attr("height", h);
	  			 /*.append("g")
	  			 .attr("transform", "translate(30,0)")
	  			 .call(yAxis);*/ /*here need if want yAxis, or can change to text show up on or in bottoms.*/
	  			 
	var bar = bars.selectAll("rect")
				  .data(bardata)
				  .enter()
				  		.append("rect")
				  		.attr("width", "20")
				  		.attr("height", function(d){ return yScale(d); })
				  		.attr("x", function(d,i){ return i * 40; })
				  		.attr("y", function(d){ return h-yScale(d);}) /*get it reverse to bar start in the bottom */
				  		.attr("fill", barColor );
				  		
	var aveLine = bars.append("rect")
					  .attr("width", bardata.length*40)
					  .attr("height", 5)
					  .attr("y", function(d){ return h-(aveBar*10)})
					  .attr("fill","#FF9E0D")
					  .attr("opacity","0.8")
					  .attr("class","aveLine");
 
	/*Not sure why, the text can not show up*/
	var aveText = d3.select(".aveLine")
					.append("text")
					.text("average pi")
  				    .attr("y", function(d) {
					   	  return h-(aveBar*8)
					   })
					  .attr("font-family", "sans-serif")
					  .attr("font-size", "11px")
					  .attr("fill", "white");
					  
	/* this is not as what I thought --> should follow http://bost.ocks.org/mike/bar/3/ or don't put axis, but put text on top and bottom
	or try this http://bl.ocks.org/mbostock/4062085, http://bl.ocks.org/Caged/6476579 */

/* Here start the pie chart */
			
	var pieColor = d3.scale.category10();
	
	var pieData = [5,10,15,20,25,30];
	
	var outR = w/2.8,
		inR = w/5;
		
	var pie = d3.layout.pie();
	
	var donut = d3.select(".donut")
				  .append("svg")
				  .attr("width",w)
				  .attr("height",h);
	
	var arc = d3.svg.arc()
					.innerRadius(inR)
					.outerRadius(outR);
	
	var arcs = donut.selectAll("g.arc")
					.data(pie(pieData))
					.enter()
						.append("g")
						.attr("class","arc")
						.attr("transform", "translate("+w/2+","+h/2+")"); // not really sure what does it mean
				
				arcs.append("path")
				   .attr("fill",function(d, i){ return pieColor(i); })
				   .attr("d",arc);
				
				arcs.append("text")
				   .attr("transform", function(d){
						return "translate("+arc.centroid(d)+")";   
				   })
				   .attr("text-anchor","middle")
				   .text(function(d){return d.value; })
				   .attr("fill","white");


/* -------------------------------------------- 
	Here start the chart 
----------------------------------------------- */

var width = 800,
    height = 500;

var board = d3.select(".chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("pointer-events","all");

var chart = board.append('svg:g');
                /*.call(d3.behavior.zoom().on("zoom", rescale))
                  .on("dblclick.zoom", null);*/

    chart.append('svg')
         .attr('width', width)
         .attr('height', height);

d3.json("script/resource.json", function(json) {

//Initialize a default force layout, using the nodes and edges in dataset

  var force = d3.layout.force()
         .nodes(json.nodes)
         .links(json.links)
         .size([width,height])
         .linkDistance(
          function(d){ return (Math.random() * 300);})
         .charge(-300)
         .gravity(0.2)
         .start();

  var link = chart.selectAll("line.link")
        .data(json.links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke","#F2F2F2")
        .style("stroke-width",function(d){
          return d.source;
        });

  var node = chart.selectAll(".node")
        .data(json.nodes)
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        .on("click", remove)
        .call(force.drag);

  node.append("rect")
      .style("opacity",1)
      .style("fill", "black");

  node.append("text")
      .attr("dy", ".35em")
      .text(function(d) { return d.label; })
      .style("fill", function(d){
        return fill(d);
      })
      .style("font-size",16);

  var textwidth = null;
  var textWidthArray = new Array();

  d3.selectAll("text")
    .attr("x", function(d){
      textwidth = this.getComputedTextLength();
      textWidthArray [0] = d.label;
      textWidthArray [1] = textwidth;
      /*console.log(textWidthArray);*/
      return -(textwidth/2)+"px";
    });

  /*d3.selectAll("rect")
      .attr("width",function(d){
        if (d.label=textWidthArray[0]){
          return textWidthArray[1]+"px";
        }
      });*/

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { 
        return "translate(" + Math.floor(d.x) + "," + Math.floor(d.y) + ")"; 
        });
  });

  function mouseover(d) {
  d3.selectAll("text").style("opacity",0.2);
  d3.selectAll("rect").style("opacity",0.2);

  var Modularity = null;
  var userId = null;

  d3.select(this)
     .data(json, function(d){ 
      Modularity = d.ModularityClass;

      if ( d.label == "etsy"){
           userId = true; 
      }

    });
/*
    if (userId == true){

      $(".userID").stop().empty().hide(function(){

        d3.json("script/user.json",function(user){
        for( x in user.influences){
          var actor_id = user.influences[x].actor_id; // this is important, remember!
          $(".userID").append(
            "<p> <i class='fa fa-user'></i> "+ actor_id + "</p>");
          }
        });

      }).fadeIn(1000);



      /*d3.json("script/tweethtml.json",function(tweet){

          var html = tweet.html;
          $(".tweet").stop().empty().append(html).hide().fadeIn(1000);
      });

    }*/

     d3.selectAll("text").filter(function(d){
      if ( Modularity == d.ModularityClass){
        return true;
      };
     }).style("opacity","1");

    $(".infoText").html(
      "<p style='color:"+ fill(d) +";'> <b> Content: "+ d.label+" </b><br/>"+
      " ID: "+ d.id + "<br/>"+
      " Modularity: "+ d.ModularityClass + "<br/>" +
      " Size: "+ Math.floor(d.size) + "<br/>" +
      " Weight: "+ d.weight +"</p>"
      );
  } /* end of mouseover */

  function mouseout() {
  d3.selectAll("text").style("opacity",1);
  d3.selectAll("rect").style("opacity",1);
  }

  function remove(){
  d3.select(this).select("text").remove();
  d3.select(this).select("rect").remove();
  }

  function fill(d){
        if (d.ModularityClass == 8){
          return "#54C571"; // Zombie Green
        }else if (d.ModularityClass == 12){
          return "#7E00FF"; // purple 
        }else if(d.ModularityClass == 13){
          return "#3CB6FF"; // Blue
        }else if(d.ModularityClass == 14){
          return "#C35817"; // RedFox
        }else if(d.ModularityClass == 19){
          return "#F75D59"; // Bean Red
        } else{
            return null;
        }
  }
});

  function rescale() {
  trans=d3.event.translate;
  scale=d3.event.scale;

  chart.attr("transform",
      "translate(" + trans + ")"
      + " scale(" + scale + ")");
  }

