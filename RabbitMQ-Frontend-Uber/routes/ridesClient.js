
var ejs = require("ejs");
var mq_client = require('./rides');
//var bcrypt = require('bcryptjs');

//function home(req, res) {
//	ejs.renderFile("./views/login.ejs", function(err, result) {
//		if (!err) {
//			res.end(result);
//		}
//	});
//}

exports.partials = function (req, res) {
	   var name = req.params.name;
	   console.log(name);
	   res.render(name);
};

function register(req, res) {
	var msg_payload = { "ride_id": req.param("ride_id"), "cust_id": req.param("cust_id"), 
			"driver_id":req.param("driver_id"), "origin":req.param("origin")
			,"dest": req.param("dest"),"date": req.param("date"),
			"distance": req.param("distance"), "duration": req.param("duration"), "flag": req.param("flag"),"requestQueue":"register"};
	
	mq_client.make_request('rides',msg_payload, function(err,results){
		console.log("Got callback from server");
		console.log(msg_payload);
			if(results.code == 200){
				console.log("Inserted ride entry sucessfully");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function c_ratings(req, res) {
	var msg_payload = { "rating": req.param("rating"), "feedback": req.param("feedback"), 
		"driver_id":req.param("driver_id"), "requestQueue":"c_ratings"};
	
	mq_client.make_request('rides',msg_payload, function(err,results){
		console.log("Got callback from server");
		console.log(msg_payload);
			if(results.code == 200){
				console.log("Inserted ride rating entry sucessfully");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function d_ratings(req, res) {
	var msg_payload = { "rating": req.param("rating"), "feedback": req.param("feedback"), 
			"cust_id":req.param("cust_id"), "requestQueue":"d_ratings"};
	
	mq_client.make_request('rides',msg_payload, function(err,results){
		console.log("Got callback from server");
		console.log(msg_payload);
			if(results.code == 200){
				console.log("Inserted ride ratings entry sucessfully");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


exports.d_ratings=d_ratings;
exports.c_ratings=c_ratings;
exports.register=register;