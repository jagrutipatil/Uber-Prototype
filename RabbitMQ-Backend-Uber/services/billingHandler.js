var ejs = require("ejs");
var billing = require("./billing");

	var res = {};	
	function handle_request (msg, callback) {
	if(msg.requestQueue=="billGenerate"){
		console.log("imp" + msg.distance);
		billing.billGenerate(msg.distance, msg.startTime, msg.endTime, msg.totalTime, msg.carType, msg.source, msg.destination, msg.customerId, msg.driverId, function(err, res) {
			console.log("imp2 " + res);
			callback(err, res);
		});
	}
		
	if(msg.requestQueue=="estimate"){
		billing.estimate(msg.distance, msg.startTime, msg.endTime, msg.totalTime, msg.carType, function(err, res) {
			console.log("imp2 " + res);
			callback(err, res);
		});
	}
		
	if(msg.requestQueue=="getUserBills"){
		console.log("resQueue : " + msg.requestQueue);
		billing.getUserBills(msg.customerId, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="getBill"){
		billing.getBill(msg.customerId, msg.driverId, function(err, res) {
			callback(err, res);
		});
	}

 }


exports.handle_request = handle_request;