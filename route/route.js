var mongoose = require('mongoose');
var user_schema = require('../model/user_schema');

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
	
	User.findOne({user: req.query.user}, function (err, userObj) 
	{
		if (err) 
		{
			console.log(err);
			
			res.writeHead(200, {"Content-Type": "text/json"});
			res.write(JSON.stringify('FIND ERROR'));
			res.end();
		} 
		else if (userObj) 
		{
			console.log('Found:', userObj);
			res.writeHead(200, {"Content-Type": "text/json"});
			res.write(JSON.stringify('USER EXIST'));
			res.end();
		} 
		else 
		{
			console.log('User registered');
			
			var user_add = new User();
			user_add.nick = req.query.nick;
			user_add.user = req.query.user;
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
					
					res.writeHead(200, {"Content-Type": "text/json"});
					res.write(JSON.stringify('SAVE ERROR'));
					res.end();
				} 
				else 
				{
					console.log('saved successfully:', userObj);
			
					res.writeHead(200, {"Content-Type": "text/json"});
					res.write(JSON.stringify('SUCCESS'));
					res.end();
				}
			});
		}
	});
}