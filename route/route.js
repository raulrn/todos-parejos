var mongoose = require('mongoose');
var user_schema = require('../model/user_schema');
var food_dish_schema = require('../model/food_dish_schema');
var food_dish_model = require('../model/food_dish');

var message_res = require('../lib/message_res');

exports.index = function (req, res)
{
	console.log('index');
	var string_json = JSON.stringify('Hello, World!');
	
	res.writeHead(200, {"Content-Type": "text/json"});
	res.write(string_json);
	res.end();
}

exports.registerUser = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	
	User.findOne({user: req.query.email}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'FIND ERROR');
		} 
		else if (userObj) 
		{
			console.log('Found:', userObj);
			message_res.res(res, 'USER EXIST');
		} 
		else 
		{
			console.log('User registered');
			
			var user_add = new User();
			user_add.nick = req.query.nick;
			user_add.email = req.query.email;
			user_add.password = req.query.password;
			user_add.isCard = req.query.isCard;
			if (user_add.isCard == true)
			{
				user_add.card = req.query.card;
			}
			
			user_add.save(function (err, userObj) 
			{
				if (err) 
				{
					console.log(err);
					message_res.res(res, 'SAVE ERROR');
				} 
				else 
				{
					console.log('saved successfully:', userObj);
					message_res.res(res, 'SUCCESS');
				}
			});
		}
	});
}

exports.getAllUsers = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	User.find({}, function(err, users) 
	{
		var userMap = {};
		var userArray = [];

		users.forEach(function(user) 
		{
// 			userMap[user._id] = user.user;
			userArray.push(user.email);
		});

		message_res.res(res, userArray);  
	});
}

exports.addFoodDish = function (req, res)
{
	var FoodDish = mongoose.model('foodDish', food_dish_schema.foodDishSchema);
	
	FoodDish.findOne({name: req.query.name}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'FIND ERROR');
		} 
		else if (userObj) 
		{
			console.log('Found:', userObj);
			message_res.res(res, 'FOOD DISH EXIST');
		} 
		else 
		{
			console.log('Food Dish registered');
			
			var food_dish_add = new FoodDish();
			food_dish_add.name = req.query.name;
			food_dish_add.cost = req.query.cost;
			
			food_dish_add.save(function (err, userObj) 
			{
				if (err) 
				{
					console.log(err);
					message_res.res(res, 'SAVE ERROR');
				} 
				else 
				{
					console.log('saved successfully:', userObj);
					message_res.res(res, 'SUCCESS');
				}
			});
		}
	});
}

exports.getAllFoodDish = function (req, res)
{
	var FoodDish = mongoose.model('foodDish', food_dish_schema.foodDishSchema);
	
	FoodDish.find({}, function(err, foodDishes) 
	{
		var foodDishArray = [];

		foodDishes.forEach(function(foodDish)
		{
			foodDishArray.push(new food_dish_model.foodDish(foodDish.name, foodDish.cost));
		});

		message_res.res(res, foodDishArray);  
	});
}