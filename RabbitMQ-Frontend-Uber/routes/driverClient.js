var ejs = require("ejs");
var mq_client = require('./client');

function signup(req, res) {
	var msg_payload = { "ssn": req.param("ssn"), "email": req.param("email"), 
			"password":req.param("password"), "firstname":req.param("firstname")
			,"lastname": req.param("lastname"),"mobileno": req.param("mobileno"),
			"address": req.param("address"), "city": req.param("city"),
			"state": req.param("state"),"postalcode": req.param("postalcode"), "dlno": req.param("dlno"), "latitude": req.param("latitude"),
			"longitude": req.param("longitude"), "url": req.param("url")
			,"requestQueue":"signup"};
	
	mq_client.make_request('driver',msg_payload, function(err,results){
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


function signin(req, res) {
	var msg_payload = { "email": req.param("email"), "password": req.param("password"),"requestQueue":"signin"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");
				req.ubersession.driver = results.value;
				console.log("Printing session\n\n");	
				console.log(req.ubersession.driver);
				console.log("session Available\n\n");	
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function remove_with_email(req, res) {
	var msg_payload = { "email": req.param("email"),"requestQueue":"remove_with_email"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function remove_with_ssn(req, res) {
	var msg_payload = { "ssn": req.param("ssn"),"requestQueue":"remove_with_ssn"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function selectAll(req, res) {
	var msg_payload = {"requestQueue":"selectAll"};	
	mq_client.make_request('driver',msg_payload, function(err, results){
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

function selectAllAvailable(req, res) {
	var msg_payload = {"latitude" : req.param("latitude"),"longitude" : req.param("longitude"), "requestQueue":"selectAllAvailable"};	
	mq_client.make_request('driver',msg_payload, function(err, results){
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



function search_with_name(req, res) {
	var msg_payload = {"firstname": req.param("firstname"), "lastname": req.param("lastname"), "requestQueue":"search_with_name"};	
	mq_client.make_request('driver',msg_payload, function(err, results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else if (results.code == 204) {
				res.send({"result":"success", "value" : ""});
			}else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function search_with_ssn(req, res) {
	console.log(req.param("ssn"));
	var msg_payload = {"ssn": req.param("ssn"), "requestQueue":"search_with_ssn"};	
	mq_client.make_request('driver',msg_payload, function(err, results){
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

function update(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "email": req.param("email"), 
			"password":req.param("password"), "firstname":req.param("firstname")
			,"lastname": req.param("lastname"),"mobileno": req.param("mobileno"),
			"postalcode": req.param("postalcode"), "requestQueue":"update"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
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

function updateLatLng(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "latitude": req.param("latitude"), 
			"longitude": req.param("longitude"),"requestQueue":"updateLatLng"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
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

function approve(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "requestQueue":"approve"};	
	mq_client.make_request('driver',msg_payload, function(err, results){
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

function search_with_email(req, res) {
	var msg_payload = {"email": req.param("email"), "requestQueue":"search_with_email"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"value": results.value, "result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}

function selectAllUnApproved(req, res) {
	var msg_payload = {"requestQueue":"selectAllUnApproved"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function rating(req, res) {
	var msg_payload = {"rating": req.param("rating"), "feedback": req.param("feedback"), "requestQueue": "driverRating"};	
	console.log(msg_payload);
	mq_client.make_request('driver',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"value": result.value, "result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}

//exports.home = home;
exports.signup = signup;
exports.signin = signin;
exports.remove_with_email = remove_with_email;
exports.remove_with_ssn = remove_with_ssn;
exports.selectAll = selectAll;
exports.selectAllUnApproved = selectAllUnApproved;
exports.search_with_name = search_with_name;
exports.search_with_email = search_with_email; 
exports.search_with_ssn = search_with_ssn;
exports.update = update;
exports.updateLatLng = updateLatLng;
exports.approve = approve;
exports.rating = rating;
exports.selectAllAvailable = selectAllAvailable;