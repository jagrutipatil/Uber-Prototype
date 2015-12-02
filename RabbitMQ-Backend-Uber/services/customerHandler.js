var ejs = require("ejs");
var customer = require("./customer");

	var res = {};	
	function handle_request (msg, callback) {
	if(msg.requestQueue=="signup"){
		customer.signup(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.cardno, msg.cvv, msg.exp_month, msg.exp_year, msg.postalcode, msg.latitude, msg.longitude, function(err, res) {
			callback(err, res);
		});
	}
		
	if(msg.requestQueue=="signin"){
		customer.signin(msg.email, msg.password, function(err, res) {
			callback(err, res);
		});
	}
		
	if(msg.requestQueue=="remove_with_email"){
		customer.remove_with_email(msg.email, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="remove_with_ssn"){
		customer.remove_with_ssn(msg.ssn, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="selectAll"){
		customer.selectAll(function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="selectAllUnApproved"){
		customer.selectAllUnApproved(function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="search_with_name"){
		customer.search_with_name(msg.firstname, msg.lastname, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="search_with_ssn"){
		customer.search_with_ssn(msg.ssn, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="update"){
		customer.update(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="updateLatLng"){
		customer.updateLatLng(msg.ssn, msg.latitude, msg.longitude, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="updatePayment"){
		customer.updatePayment(msg.ssn, msg.cardno, msg.cvv, msg.exp_month, msg.exp_year, function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="approve"){
		customer.approve(msg.ssn, function(err, res) {
			callback(err, res);
		});
	}
 }


exports.handle_request = handle_request;