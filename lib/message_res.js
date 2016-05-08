exports.res = function (res, message)
{
	res.writeHead(200, {"Content-Type": "text/json"});
	res.write(JSON.stringify(message));
	res.end();
}
