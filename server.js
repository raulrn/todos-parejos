var express = require('express');
var app = express();

// var router = require('./router');

function initializate () 
{ //Pasamos el objeto route
	
	app.listen(1818, function() 
	{
		console.log("Node server running on http://localhost:1818");
	});
}

exports.initializate = initializate; //Exportamos la función