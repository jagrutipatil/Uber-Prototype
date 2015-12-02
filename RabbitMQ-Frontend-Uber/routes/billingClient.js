var ejs = require("ejs");
var mq_client = require('./client');

function billGenerate(req, res) {
	var msg_payload = { "distance": req.param("distance"), "startTime": req.param("startTime"), 
			"endTime":req.param("endTime"), "totalTime":req.param("totalTime")
			,"carType": req.param("carType"),"source": req.param("source"),
			"destination": req.param("destination"), "customerId": req.param("customerId"),
			"driverId": req.param("driverId"),"requestQueue":"billGenerate"};
	
	mq_client.make_request('billing',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


function estimate(req, res) {
	var msg_payload = { "distance": req.param("distance"), "startTime": req.param("startTime"), 
			"endTime":req.param("endTime"), "totalTime":req.param("totalTime")
			,"carType": req.param("carType"),"requestQueue":"estimate"};
	
	mq_client.make_request('billing',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


function getUserBills(req, res) {
	var msg_payload = { "customerId": req.param("customerId"),"requestQueue":"getUserBills"};
	console.log("customerId in UI" + req.param("customerId"));
	mq_client.make_request('billing',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function getBill(req, res) {
	var msg_payload = { "customerId": req.param("customerId"), "driverId": req.param("driverId"),"requestQueue":"getBill"};
	
	mq_client.make_request('billing',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function getDriverSummary(req, res) {
	var msg_payload = { "driverId": req.param("driverId"),"requestQueue":"getDriverSummary"};
	
	mq_client.make_request('billing',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log(results.value);				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}



exports.billGenerate = billGenerate;
exports.estimate = estimate;
exports.getUserBills = getUserBills;
exports.getBill = getBill;
exports.getDriverSummary = getDriverSummary;

