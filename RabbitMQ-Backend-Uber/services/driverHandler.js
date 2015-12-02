var ejs = require("ejs");
var driver = require("./driver");

	var res = {};	
	function handle_request (msg, callback) {
		
	if(msg.requestQueue=="signup"){
		driver.signup(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.address, msg.city, msg.state, msg.postalcode, msg.dlno, msg.latitude, msg.longitude,msg.url , function(err, res){
			callback(err, res);
		});
	}
		
	if(msg.requestQueue=="signin"){
		driver.signin(msg.email, msg.password, function(err, res) {
			callback(err, res);
		});
	}
		
	if(msg.requestQueue=="remove_with_email"){
		driver.remove_with_email(msg.email, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="remove_with_ssn"){
		driver.remove_with_ssn(msg.ssn, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="selectAll"){
		driver.selectAll(function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="selectAllAvailable"){
		driver.selectAllAvailable(msg.latitude, msg.longitude, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="selectAllUnApproved"){
		driver.selectAllUnApproved(function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="search_with_name"){
		driver.search_with_name(msg.firstname, msg.lastname, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="search_with_ssn"){
		driver.search_with_ssn(msg.ssn, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="update"){
		driver.update(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.address, msg.city, msg.state, msg.postalcode, msg.dlno, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="updateLatLng"){
		driver.updateLatLng(msg.ssn, msg.latitude, msg.longitude, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="approve"){
		driver.approve(msg.ssn, function(err, res) {
			callback(err, res);
		});
	}
 }


exports.handle_request = handle_request;