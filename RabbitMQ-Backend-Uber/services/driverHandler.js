var ejs = require("ejs");
var driver = require("./driver");

	var res = {};	
	if(msg.requestQueue=="signup"){
		driver.signup(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.cardno, msg.cvv, msg.exp_date, msg.postalcode, function(res) {
			callback(res);
		});
	}
		
	if(msg.requestQueue=="signin"){
		driver.signin(msg.email, msg.password, function(res) {
			callback(res);
		});
	}
		
	if(msg.requestQueue=="remove_with_email"){
		driver.remove_with_email(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="remove_with_ssn"){
		driver.remove_with_ssn(msg.ssn, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="selectAll"){
		driver.selectAll(function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="search_with_name"){
		driver.search_with_name(msg.firstname, msg.lastname, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="search_with_ssn"){
		driver.search_with_ssn(msg.ssn, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="update"){
		driver.update(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.postalcode, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="approve"){
		driver.approve(msg.ssn, function(res) {
			callback(null, res);
		});
	}
 }


exports.handle_request = handle_request;
