var chartDataXY = [

{displayName:'Patriots', entityType:'OTHER', popularity:0.8450980400142568, date:'2015-01-20T13:34:18Z', valence:0.652, arousal:0.586, dominance:0.59, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'London', entityType:'LOCATION', popularity:0.7781512503836436, date:'2015-01-20T13:34:18Z', valence:0.637, arousal:0.595, dominance:0.585, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Houthi Rebels', entityType:'PERSON', popularity:0.7781512503836436, date:'2015-01-20T13:34:18Z', valence:0.6, arousal:0.592, dominance:0.557, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Erin McPike', entityType:'PERSON', popularity:0.6989700043360189, date:'2015-01-20T13:34:18Z', valence:0.615, arousal:0.586, dominance:0.567, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Bobby Jindal', entityType:'PERSON', popularity:0.6989700043360189, date:'2015-01-20T13:34:18Z', valence:0.627, arousal:0.59, dominance:0.573, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Meteorologist Pedram Javaheri', entityType:'PERSON', popularity:0.6020599913279624, date:'2015-01-20T13:34:18Z', valence:0.594, arousal:0.601, dominance:0.55, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Economy', entityType:'OTHER', popularity:0.6020599913279624, date:'2015-01-20T13:34:18Z', valence:0.632, arousal:0.588, dominance:0.583, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Transformations', entityType:'OTHER', popularity:0.6020599913279624, date:'2015-01-20T13:34:18Z', valence:0.648, arousal:0.575, dominance:0.588, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'ISIS Video', entityType:'ORGANIZATION', popularity:0.6020599913279624, date:'2015-01-20T13:34:18Z', valence:0.62, arousal:0.584, dominance:0.579, channel:'us-cnnhd', lineColor:'cnn.png'},
{displayName:'Message From ISIS', entityType:'ORGANIZATION', popularity:0.6020599913279624, date:'2015-01-20T13:34:18Z', valence:0.655, arousal:0.575, dominance:0.58, channel:'us-cnnhd', lineColor:'cnn.png'},

{displayName:'Gorongosa', entityType:'LOCATION', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.672, arousal:0.563, dominance:0.601, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Greece', entityType:'LOCATION', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.614, arousal:0.559, dominance:0.57, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Eric Jaglicic', entityType:'PERSON', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.719, arousal:0.578, dominance:0.616, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Sharks', entityType:'OTHER', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.679, arousal:0.587, dominance:0.617, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Investors', entityType:'OTHER', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.685, arousal:0.592, dominance:0.617, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Galaxie', entityType:'OTHER', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.698, arousal:0.559, dominance:0.636, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Earnings Per Share', entityType:'OTHER', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.664, arousal:0.562, dominance:0.601, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'China GDP', entityType:'LOCATION', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.611, arousal:0.544, dominance:0.573, channel:'us-cnbchd', lineColor:'cnbc.png'},
{displayName:'Median', entityType:'OTHER', popularity:0.47712125471966244, date:'2015-01-20T14:34:15Z', valence:0.642, arousal:0.562, dominance:0.596, channel:'us-cnbchd', lineColor:'cnbc.png'},
]; 



var chart;
var xAxis;
var yAxis;

AmCharts.ready(function () {
	// XY Chart
	chart = new AmCharts.AmXYChart();
	chart.pathToImages = "http://www.amcharts.com/lib/3/images/";
	chart.dataProvider = chartDataXY;

	xAxis = new AmCharts.ValueAxis();
	xAxis.position = "bottom";
	xAxis.axisAlpha = 0;
	xAxis.autoGridCount = true;
	xAxis.title = "valence";
	xAxis.valueField = "valence";
	chart.addValueAxis(xAxis);

	yAxis = new AmCharts.ValueAxis();
	yAxis.position = "left";
	yAxis.axisAlpha = 0;
	yAxis.autoGridCount = true;
	yAxis.title = "arousal";
	yAxis.valueField = "arousal";
	chart.addValueAxis(yAxis);

	// GRAPHS
	var graph = new AmCharts.AmGraph();
	graph.valueField = "popularity";
	graph.lineColorField = "lineColor";
	graph.bulletSize = 5;
	graph.bullet = "circle";
	graph.customBulletField ="lineColor";
	graph.xField = "valence";
	graph.yField = "arousal";
	graph.lineAlpha = 0;
	graph.title = "Real time topic sentiment"
		graph.balloonText = "[[displayName]]\n valence:<b>[[x]]</b> \n arousal:<b>[[y]]</b> \n popularity:<b>[[popularity]]</b>\n[[channel]]"
			chart.addGraph(graph);

	var chartCursor = new AmCharts.ChartCursor();
	chart.addChartCursor(chartCursor);

	var chartScrollbar = new AmCharts.ChartScrollbar();
	chartScrollbar.hideResizeGrips = false;
	chart.addChartScrollbar(chartScrollbar);



	// WRITE                                                
	chart.write("chartdivtopics");
});


