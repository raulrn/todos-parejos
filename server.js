var express = require('express');
var app = express();
//Lets load the mongoose module in our program
var mongoose = require('mongoose');

var route = require('./route/route');


// var router = require('./router');

function initializate () 
{ //Pasamos el objeto route
	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://localhost/allequal', function(err, res) 
	{
		if(err) throw err;
		console.log('Connected to Database');
	});
	
	app.get('/index', function (req, res) 
	{
// 		console.log('index');
// // 		var hello = 
// 		var string_json = JSON.stringify('Hello, World!');
// 		
// 		res.writeHead(200, {"Content-Type": "text/json"});
// 		res.write(string_json);
// 		res.end();
		route.index(req, res);
		
	});
	
	app.listen(1818, function() 
	{
		console.log("Node server running on http://localhost:1818");
	});
}

exports.initializate = initializate; //Exportamos la función