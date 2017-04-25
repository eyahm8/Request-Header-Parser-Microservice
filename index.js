var express = require('express');
var app = express();
var port = process.env.PORT || 5000;
var parser = require('ua-parser-js');


app.get('/', function(req, res) {
	var ua = parser(req.get('user-agent'))
	var ip = req.headers['x-forwarded-for'] ||
		 req.connection.remoteAddress ||
    	 req.socket.remoteAddress ||
    	 req.connection.socket.remoteAddress;
	var lang = req.get('accept-language')
	var info = {
		"ipaddress": ip,
		"language": lang.split(',')[0],
		"software": ua.os.name + " " + ua.os.version,
		"CPU": ua.cpu.architecture,
		"Device": ua.engine.name
	}
	res.send(info)
});

app.listen(port, function () {
	console.log("listening on: " + port);

});


