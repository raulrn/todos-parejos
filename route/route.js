var mongoose = require('mongoose');

var user_schema = require('../model/user_schema');
var user_model = require('../model/user');

var food_dish_schema = require('../model/food_dish_schema');
var food_dish_model = require('../model/food_dish');

var user_count_schema = require('../model/user_count_schema');

var global_count_schema = require('../model/global_count_schema');
var global_count = require('../model/global_count');

var debtor_model = require('../model/debtor');

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
	
	User.findOne({email: req.query.email}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'registerUser: FIND ERROR');
		} 
		else if (userObj) 
		{
			message_res.res(res, 'registerUser: USER EXIST');
		} 
		else 
		{
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
					message_res.res(res, 'registerUser: SAVE ERROR');
				} 
				else 
				{
					message_res.res(res, 'registerUser: SUCCESS');
				}
			});
		}
	});
}

exports.loginUser = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	
	User.findOne({email: req.query.email}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'loginUser: FIND ERROR');
		} 
		else if (userObj)  
		{
			if (userObj.password == req.query.password)
			{
				userObj.isOnline = true;
// 				message_res.res(res, 'USER ONLINE');
				console.log('USER ONLINE');
			}
			
			userObj.save(function (err, userObj) 
			{
				if (err) 
				{
					message_res.res(res, 'loginUser: SAVE ERROR');
				} 
				else 
				{
					message_res.res(res, 'loginUser: SUCCESS');
				}
			});
		} 
		else 
		{
			message_res.res(res, 'loginUser: USER NOT REGISTERD');
		}
	});
}

exports.logoutUser = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	
	User.findOne({email: req.query.email}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'logoutUser: FIND ERROR');
		} 
		else if (userObj)  
		{
			userObj.isOnline = false;
			
			userObj.save(function (err, userObj) 
			{
				if (err) 
				{
					message_res.res(res, 'logoutUser: SAVE ERROR');
				} 
				else 
				{
					message_res.res(res, 'logoutUser: SUCCESS');
				}
			});
		} 
		else 
		{
			message_res.res(res, 'logoutUser: USER NOT REGISTERD');
		}
	});
}

exports.getAllUsers = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	User.find({}, function(err, users) 
	{
		var userArray = [];
		
		users.forEach(function(user) 
		{
			userArray.push(new user_model.user(user.nick, user.email, '', user.isOnline, false, ''));
		});

		message_res.res(res, userArray);  
	});
}

exports.createGlobalCount = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	User.findOne({email: req.query.email}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'createGlobalCount: FIND ERROR');
		} 
		else if (userObj)  
		{
			if (userObj.isOnline == true)
			{
				GlobalCount.findOne({name: req.query.name}, function (err, globalCountObj) 
				{
					if (err) 
					{
						console.log(err);
						message_res.res(res, 'createGlobalCount: FIND ERROR');
					} 
					else if (globalCountObj)  
					{
						message_res.res(res, 'createGlobalCount: GLOBAL COUNT IS EXIST');
					} 
					else 
					{
						var global_count_add = new GlobalCount();
						global_count_add.name = req.query.name;
						global_count_add.email = req.query.email;
						
						global_count_add.save(function (err, globalCountObj) 
						{
							if (err) 
							{
								console.log(err);
								message_res.res(res, 'createGlobalCount: SAVE ERROR');
							} 
							else 
							{
								message_res.res(res, 'createGlobalCount: SUCCESS');
							}
						});
					}
				});
			}
			else
			{
				message_res.res(res, 'createGlobalCount: USER OFFLINE');
			}
		} 
		else 
		{
			message_res.res(res, 'createGlobalCount: USER NOT REGISTERD');
		}
	});
}

exports.addUserToGlobalCount = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	User.findOne({email: req.query.email}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'addUserToGlobalCount: FIND ERROR');
		} 
		else if (userObj)  
		{
			console.log('Found:', userObj);
			
			GlobalCount.findOne({name: req.query.name, email: req.query.email}, function (err, globalCountObj) 
			{
				if (err) 
				{
					console.log(err);
					message_res.res(res, 'addUserToGlobalCount: FIND ERROR');
				} 
				else if (globalCountObj)  
				{
					message_res.res(res, 'addUserToGlobalCount: USER ALREADY REGISTERED');
				} 
				else 
				{
					var global_count_add = new GlobalCount();
					global_count_add.name = req.query.name;
					global_count_add.email = req.query.email;
					
					global_count_add.save(function (err, globalCountObj) 
					{
						if (err) 
						{
							console.log(err);
							message_res.res(res, 'addUserToGlobalCount: SAVE ERROR');
						} 
						else 
						{
							message_res.res(res, 'addUserToGlobalCount: SUCCESS');
						}
					});
				}
			});
		} 
		else 
		{
			message_res.res(res, 'addUserToGlobalCount: USER NOT REGISTERD');
		}
	});
}

exports.getMyGlobalCounts = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	GlobalCount.find({}, function(err, globalCounts) 
	{
		var globalCountsArray = [];

		globalCounts.forEach(function(globalCount) 
		{
			if (globalCount.email == req.query.email)
			{
				globalCountsArray.push(new global_count.globalCount(globalCount.name, globalCount.email, globalCount.amount, globalCount.isLend, globalCount.lender, globalCount.isAgreeToPay));
			}
		});
		message_res.res(res, globalCountsArray);  
	});
}

exports.getUsersOfGlobalCount = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	GlobalCount.find({}, function(err, globalCounts) 
	{
		var usersArray = [];

		globalCounts.forEach(function(globalCount) 
		{
			if (globalCount.name == req.query.name)
			{
				console.log('Find Global Count ' + globalCount.name);
				usersArray.push(globalCount.email);
			}
		});
		message_res.res(res, usersArray);  
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
			message_res.res(res, 'addFoodDish: FIND ERROR');
		} 
		else if (userObj) 
		{
			message_res.res(res, 'addFoodDish: FOOD DISH EXIST');
		} 
		else 
		{
			var food_dish_add = new FoodDish();
			food_dish_add.name = req.query.name;
			food_dish_add.cost = req.query.cost;
			
			food_dish_add.save(function (err, userObj) 
			{
				if (err) 
				{
					message_res.res(res, 'addFoodDish: SAVE ERROR');
				} 
				else 
				{
					message_res.res(res, 'addFoodDish: SUCCESS');
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

exports.addFoodDishToUser = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	var FoodDish = mongoose.model('foodDish', food_dish_schema.foodDishSchema);
	var UserCount = mongoose.model('userCount', user_count_schema.userCountSchema);
	
	GlobalCount.findOne({name: req.query.nameCount, email: req.query.email}, function (err, globalCountObj) 
	{
		if (err) 
		{
			console.log(err);
			message_res.res(res, 'addFoodDishToUser: FIND GLOBAL COUNT ERROR');
		} 
		else if (globalCountObj)  
		{
			console.log('Found:', globalCountObj);
			
			FoodDish.findOne({name: req.query.nameFoodDish}, function (err, foodDishObj) 
			{
				if (err) 
				{
					console.log(err);
					message_res.res(res, 'addFoodDishToUser: FIND FOOD DISH ERROR');
				} 
				else if (foodDishObj) 
				{
					var user_count_add = new UserCount();
					user_count_add.email = req.query.email;
					user_count_add.nameCount = globalCountObj.name;
					user_count_add.foodDish = foodDishObj.name;
					user_count_add.cost = foodDishObj.cost;
					
					user_count_add.save(function (err, userCountObj) 
					{
						if (err) 
						{
							console.log(err);
							message_res.res(res, 'addFoodDishToUser: SAVE USER COUNT ERROR');
						} 
						else 
						{
							console.log('saved user count successfully:', userCountObj);
						}
					});
					
					globalCountObj.amount = globalCountObj.amount + foodDishObj.cost;
					
					globalCountObj.save(function (err, globalCountObj)
					{
						if (err) 
						{
							console.log(err);
							message_res.res(res, 'addFoodDishToUser: SAVE GLOBAL COUNT ERROR');
						} 
						else 
						{
							message_res.res(res, 'addFoodDishToUser: SUCCESS');
						}
					});
				} 
				else 
				{
					message_res.res(res, 'addFoodDishToUser: FOOD DISH NOT REGISTERED');
				}
			});
		} 
		else 
		{
			message_res.res(res, 'addFoodDishToUser: GLOBAL COUNT NOT REGISTERED');
		}
	});
}

exports.payUserCount = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	var FoodDish = mongoose.model('foodDish', food_dish_schema.foodDishSchema);
	var UserCount = mongoose.model('userCount', user_count_schema.userCountSchema);
	
	GlobalCount.findOne({name: req.query.nameCount, email: req.query.emailLender}, function (err, globalCountObj) 
	{
		if (err)
		{
			console.log(err);
			message_res.res(res, 'payUserCount: FIND GLOBAL COUNT ERROR');
		} 
		else if (globalCountObj)
		{
			GlobalCount.findOne({name: req.query.nameCount, email: req.query.emailBorrower}, function (err, globalCountBObj) 
			{
				if (err)
				{
					console.log(err);
					message_res.res(res, 'payUserCount: FIND GLOBAL COUNT ERROR');
				} 
				else if (globalCountBObj)
				{
					if (globalCountBObj.isLend == true)
					{
						message_res.res(res, 'payUserCount: ALREADY LENDER');
					}
					else
					{
						globalCountBObj.isLend = true
						globalCountBObj.lender = globalCountObj.email;
						globalCountObj.amount = globalCountObj.amount + globalCountBObj.amount;
						
						globalCountObj.save(function (err, globalCountObj)
						{
							if (err) 
							{
								console.log(err);
								message_res.res(res, 'payUserCount: SAVE GLOBAL COUNT ERROR');
							} 
							else 
							{
								console.log('saved global count successfully:', globalCountObj);
							}
						});
						
						globalCountBObj.save(function (err, globalCountBObj)
						{
							if (err) 
							{
								console.log(err);
								message_res.res(res, 'payUserCount: SAVE GLOBAL COUNT ERROR');
							} 
							else 
							{
								message_res.res(res, 'payUserCount: SUCCESS');
							}
						});
					}
				}
				else 
				{
					message_res.res(res, 'payUserCount: GLOBAL COUNT NOT REGISTERED');
				}
			});
		} 
		else 
		{
			message_res.res(res, 'payUserCount: GLOBAL COUNT NOT REGISTERED');
		}
	});
}

exports.unpayUserCount = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	var FoodDish = mongoose.model('foodDish', food_dish_schema.foodDishSchema);
	var UserCount = mongoose.model('userCount', user_count_schema.userCountSchema);
	
	GlobalCount.findOne({name: req.query.nameCount, email: req.query.emailLender}, function (err, globalCountObj) 
	{
		if (err)
		{
			console.log(err);
			message_res.res(res, 'unpayUserCount: FIND GLOBAL COUNT ERROR');
		} 
		else if (globalCountObj)
		{
			console.log('Found:', globalCountObj);
			
			GlobalCount.findOne({name: req.query.nameCount, email: req.query.emailBorrower}, function (err, globalCountBObj) 
			{
				if (err)
				{
					console.log(err);
					message_res.res(res, 'unpayUserCount: FIND GLOBAL COUNT ERROR');
				} 
				else if (globalCountBObj)
				{
					console.log('Found:', globalCountBObj);
					
					if (globalCountBObj.isLend == false)
					{
						console.log('Not lender');
						message_res.res(res, 'unpayUserCount: GLOBAL COUNT NOT REGISTERED');
					}
					else
					{
						globalCountBObj.isLend = false
						globalCountBObj.lender = '';
						globalCountObj.amount = globalCountObj.amount - globalCountBObj.amount;
					}
					
					globalCountObj.save(function (err, globalCountObj)
					{
						if (err) 
						{
							console.log(err);
							message_res.res(res, 'unpayUserCount: SAVE GLOBAL COUNT ERROR');
						} 
						else 
						{
							console.log('saved global count successfully:', globalCountObj);
						}
					});
					
					globalCountBObj.save(function (err, globalCountBObj)
					{
						if (err) 
						{
							message_res.res(res, 'unpayUserCount: SAVE GLOBAL COUNT ERROR');
						} 
						else 
						{
							message_res.res(res, 'unpayUserCount: SUCCESS');
						}
					});
				}
				else 
				{
					message_res.res(res, 'unpayUserCount: GLOBAL COUNT NOT REGISTERED');
				}
			});
		} 
		else 
		{
			message_res.res(res, 'unpayUserCount: GLOBAL COUNT NOT REGISTERED');
		}
	});
}

exports.agreeToPay = function (req, res)
{
	var User = mongoose.model('user', user_schema.userSchema);
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	GlobalCount.findOne({name: req.query.name, email: req.query.email}, function (err, globalCountObj)
	{
		if (err)
		{
			console.log(err);
			message_res.res(res, 'agreeToPay: FIND GLOBAL COUNT ERROR');
		} 
		else if (globalCountObj)
		{
			User.findOne({email: req.query.email}, function (err, userObj) 
			{
				if (err) 
				{
					console.log(err);
					message_res.res(res, 'agreeToPay: FIND ERROR');
				} 
				else if (userObj) 
				{
					if (userObj.password == req.query.password)
					{
						if (userObj.isCard == true)
						{
							globalCountObj.isAgreeToPay = true;
							
							globalCountObj.save(function (err, globalCountObj) 
							{
								if (err) 
								{
									console.log(err);
									message_res.res(res, 'agreeToPay: SAVE ERROR');
								} 
								else 
								{
									message_res.res(res, 'agreeToPay: SUCCESS');
								}
							});	
						}
						else
						{
							if (globalCountObj.isLend == true)
							{
								globalCountObj.isAgreeToPay = true;
							
								globalCountObj.save(function (err, globalCountObj) 
								{
									if (err) 
									{
										console.log(err);
										message_res.res(res, 'agreeToPay: SAVE ERROR');
									} 
									else 
									{
										message_res.res(res, 'agreeToPay: SUCCESS');
									}
								});	
							}
							else
							{
								message_res.res(res, 'agreeToPay: SEARCH FOR LENDER');
							}
						}
					}
					else
					{
						message_res.res(res, 'agreeToPay: WRONG PASSWORD');
					}
				} 
				else 
				{
					message_res.res(res, 'agreeToPay: USER NOT FOUND');
				}
			});
		}
		else 
		{
			message_res.res(res, 'agreeToPay: GLOBAL COUNT NOT REGISTERED');
		}
	});
}

exports.collect = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	GlobalCount.find({name: req.query.name}, function(err, globalCounts) 
	{
		var isPaid = true;
		var sluggish = '';
		var totalAmount = 0;

		globalCounts.forEach(function(globalCount)
		{
			if (globalCount.isAgreeToPay == false && isPaid == true)
			{
				isPaid = false;
				sluggish = globalCount.email;
			}
			else if (globalCount.isAgreeToPay == true && isPaid == true)
			{
				isPaid = true;
				
				if (globalCount.isLend == false)
				{
					totalAmount = totalAmount + globalCount.amount;
				}
			}
		});

		if (isPaid == true)
		{
			globalCounts.forEach(function(globalCount)
			{
				globalCount.isPaid = true;
				
				//Conexion
				
				globalCount.isCollect = true;
				
				globalCount.save(function (err, globalCountObj) 
				{
					if (err) 
					{
						console.log(err);
					} 
					else 
					{
						;
					}
				});
			});
			
			message_res.res(res, 'collect: COLLECT ' + totalAmount);
		}
		else
		{
			message_res.res(res, 'collect: SLUGGISH: ' + sluggish);
		}
	});
}

exports.getDebtors = function (req, res)
{
	var GlobalCount = mongoose.model('globalCount', global_count_schema.globalCountSchema);
	
	GlobalCount.find({}, function(err, globalCounts) 
	{
		var debtorArray = [];

		globalCounts.forEach(function(globalCount)
		{
			if (globalCount.isLend == true)
			{
				if (globalCount.lender == req.query.email)
				{
					debtorArray.push(new debtor_model.debtor(globalCount.name, globalCount.email, globalCount.amount));
				}
			}
		});
		message_res.res(res, debtorArray);
	});
}