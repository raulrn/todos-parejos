var mongoose = require('mongoose');

var user_schema = require('../model/user_schema');
var user_model = require('../model/user');

var food_dish_schema = require('../model/food_dish_schema');
var food_dish_model = require('../model/food_dish');

exports.testUsers = function ()
{
	var User = mongoose.model('user', user_schema.userSchema);
	
	var user_add1 = new User();
	user_add1.nick = 'Papa';
	user_add1.email = 'papa@gmail.com';
	user_add1.password = 'abc';
	user_add1.isOnline = true;
	user_add1.isCard = false;
	user_add1.card = '';
	
	user_add1.save(function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
		} 
		else 
		{
			console.log('saved successfully:', userObj);
		}
	});
	
	var user_add2 = new User();
	user_add2.nick = 'Mama';
	user_add2.email = 'mama@gmail.com';
	user_add2.password = '123';
	user_add2.isOnline = true;
	user_add2.isCard = true;
	user_add2.card = '123456789';
	
	user_add2.save(function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
		} 
		else 
		{
			console.log('saved successfully:', userObj);
		}
	});
	
	var user_add3 = new User();
	user_add3.nick = 'Shelly';
	user_add3.email = 'shelly@gmail.com';
	user_add3.password = 'hola';
	user_add3.isOnline = true;
	user_add3.isCard = false;
	user_add3.card = '';
	
	user_add3.save(function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
		} 
		else 
		{
			console.log('saved successfully:', userObj);
		}
	});
	
	var user_add4 = new User();
	user_add4.nick = 'Raul';
	user_add4.email = 'raul@gmail.com';
	user_add4.password = 'asdf';
	user_add4.isOnline = true;
	user_add4.isCard = true;
	user_add4.card = '987654321';
	
	user_add4.save(function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
		} 
		else 
		{
			console.log('saved successfully:', userObj);
		}
	});
}

exports.testFoodDishes = function()
{
	var FoodDish = mongoose.model('foodDish', food_dish_schema.foodDishSchema);
	
	var foodDishesArray = ['enchiladas', 'sopes', 'huarache', 'quesadilla', 'tostada', 'pambazo', 'refresco', 'jugo'];
	var costArray = [50, 40, 30, 20, 15, 35, 10, 8];
	
	for (var i = 0; i < foodDishesArray.length; i++)
	{ 
		var food_dish_add = new FoodDish();
		food_dish_add.name = foodDishesArray[i];
		food_dish_add.cost = costArray[i];
		
		food_dish_add.save(function (err, foodDishObj) 
		{
			if (err) 
			{
				console.log(err);
			} 
			else 
			{
				console.log('saved successfully:', foodDishObj);
			}
		});
	}
}