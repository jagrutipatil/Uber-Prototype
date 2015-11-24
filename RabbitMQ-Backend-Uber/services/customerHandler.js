var ejs = require("ejs");
var customer = require("./customer");



	var res = {};	
	function handle_request (msg, callback) {
	if(msg.requestQueue=="signup"){
		customer.signup(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.cardno, msg.cvv, msg.exp_date, msg.postalcode, function(res) {
			callback(res);
		});
	}
		
	if(msg.requestQueue=="signin"){
		customer.signin(msg.email, msg.password, function(res) {
			callback(res);
		});
	}
		
	if(msg.requestQueue=="remove_with_email"){
		customer.remove_with_email(msg.email, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="remove_with_ssn"){
		customer.remove_with_ssn(msg.ssn, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="selectAll"){
		customer.selectAll(function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="search_with_name"){
		customer.search_with_name(msg.firstname, msg.lastname, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="search_with_ssn"){
		customer.search_with_ssn(msg.ssn, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="update"){
		customer.update(msg.ssn, msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.postalcode, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="approve"){
		customer.approve(msg.ssn, function(res) {
			callback(null, res);
		});
	}
 }


exports.handle_request = handle_request;
