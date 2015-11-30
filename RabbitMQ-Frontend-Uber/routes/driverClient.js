var ejs = require("ejs");
var mq_client = require('./client');

function signup(req, res) {
	var msg_payload = { "ssn": req.param("ssn"), "email": req.param("email"), 
			"password":req.param("password"), "firstname":req.param("firstname")
			,"lastname": req.param("lastname"),"mobileno": req.param("mobileno"),
			"address": req.param("address"), "city": req.param("city"),
			"state": req.param("state"),"postalcode": req.param("postalcode"), "dlno": req.param("dlno"),"requestQueue":"signup"};
	
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

function search_with_name(req, res) {
	var msg_payload = {"firstname": req.param("firstname"), "lastname": req.param("lastname"), "requestQueue":"search_with_name"};	
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

function search_with_ssn(req, res) {
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
exports.approve = approve;