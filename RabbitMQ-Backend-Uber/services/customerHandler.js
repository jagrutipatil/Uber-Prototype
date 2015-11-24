var ejs = require("ejs");
var driver = require("./driver");


function handle_request(msg, callback){	
	var res = {};	
	if(msg.requestQueue=="signup"){
		driver.signup(msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.carno, msg.cvv, msg.expno, msg.postalcode, function(res) {
			callback(res);
		});
	}
	
	if(msg.requestQueue=="signin"){
		driver.signin(msg.email, msg.password, function(res) {
			callback(res);
		});
	}
	
	if(msg.requestQueue=="remove_with_email"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="remove_with_ssn"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="selectAll"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="search_with_name"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="search_with_ssn"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="update"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="approve"){
		driver.remove(msg.email, function(res) {
			callback(null, res);
		});
	}
 }


exports.handle_request = handle_request;
