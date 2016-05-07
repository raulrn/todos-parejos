
exports.index = function (req, res)
{
	console.log('index');
	var string_json = JSON.stringify('Hello, World!');
	
	res.writeHead(200, {"Content-Type": "text/json"});
	res.write(string_json);
	res.end();
}