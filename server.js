var express = require('express');
var app = express();
//Lets load the mongoose module in our program
var mongoose = require('mongoose');



// var router = require('./router');

function initializate () 
{ //Pasamos el objeto route
	
	app.listen(1818, function() 
	{
		console.log("Node server running on http://localhost:1818");
	});
	
	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://localhost/allequal', function(err, res) 
	{
		if(err) throw err;
		console.log('Connected to Database');
	});
}

exports.initializate = initializate; //Exportamos la función