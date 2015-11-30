var ejs = require("ejs");
var rides = require("./rides");

	var res = {};	
	function handle_request (msg, callback) {
		console.log("ridesHandler.js");
		console.log(msg);
	if(msg.requestQueue=="register"){
		console.log("ridesHandler.js inside");
		rides.register(msg.ride_id, msg.cust_id, msg.driver_id, msg.origin, msg.dest, msg.date, msg.distance, msg.duration, msg.flag, function(err, res) {
			callback(err, res);
		});
	}
	}

exports.handle_request = handle_request;