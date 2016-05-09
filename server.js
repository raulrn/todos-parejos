var express = require('express');
var app = express();
//Lets load the mongoose module in our program
var mongoose = require('mongoose');

var route = require('./route/route');

var dataTest = require('./data/dataTest');
// var router = require('./router');

function initializate () 
{ //Pasamos el objeto route
	//Lets connect to our database using the DB server URL.
	mongoose.connect('mongodb://localhost/allequal', function(err, res) 
	{
		if(err) throw err;
		console.log('Connected to Database');
	});
	
// 	dataTest.testUsers();
// 	dataTest.testFoodDishes();
	
	app.get('/index', function (req, res) 
	{
		route.index(req, res);
	});
	
	app.get('/registerUser', function(req, res)
	{
		route.registerUser(req, res);
	});
	
	app.get('/loginUser', function(req, res)
	{
		route.loginUser(req, res);
	});
	
	app.get('/logoutUser', function (req, res)
	{
		route.logoutUser(req, res);
	})
	
	app.get('/getAllUsers', function(req, res)
	{
		route.getAllUsers(req, res);
	});
	
	app.get('/createGlobalCount', function(req, res)
	{
		route.createGlobalCount(req, res);
	});
	
	app.get('/addUserToGlobalCount', function(req, res)
	{
		route.addUserToGlobalCount(req, res);
	});
	
	app.get('/getMyGlobalCounts', function(req, res)
	{
		route.getMyGlobalCounts(req, res);
	});
	
	app.get('/getUsersOfGlobalCount', function(req, res)
	{
		route.getUsersOfGlobalCount(req, res);
	});
	
	app.get('/addFoodDish', function(req, res)
	{
		route.addFoodDish(req, res);
	})
	
	app.get('/getAllFoodDish', function (req, res)
	{
		route.getAllFoodDish(req, res);
	});
	
	app.get('/addFoodDishToUser', function(req, res)
	{
		route.addFoodDishToUser(req, res);
	});
	
	app.get('/payUserCount', function(req, res)
	{
		route.payUserCount(req, res);
	});
	
	app.get('/unpayUserCount', function(req, res)
	{
		route.unpayUserCount(req, res);
	});
	
	app.get('/agreeToPay', function(req, res)
	{
		route.agreeToPay(req, res);
	});
	
	app.get('/collect', function (req, res)
	{
		route.collect(req, res);
	});
	
	app.get('/getDebtors', function (req, res)
	{
		route.getDebtors(req, res);
	});
	
	app.listen(1818, function() 
	{
		console.log("Node server running on http://localhost:1818");
	});
}

exports.initializate = initializate; //Exportamos la función