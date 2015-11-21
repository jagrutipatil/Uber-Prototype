var ejs = require("ejs");
var mongo = require("./mongo");
var driver = require("./driver");
var customer = require("./customer");
var mongoURL = "mongodb://localhost:27017/users";


function handle_request(msg, callback){	
	var res = {};	
	if(msg.requestQueue=="signup_customer"){
		customer.signup(msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.carno, msg.cvv, msg.expno, msg.postalcode, function(res) {
			callback(res);
		});
	}
	
	if(msg.requestQueue=="signin_customer"){
		customer.signin(msg.email, msg.password, function(res) {
			callback(res);
		});
	}
	
	if(msg.requestQueue=="delete_customer"){
		customer.remove(msg, function(res) {
			callback(null, res);
		});
	}
	
 }


exports.handle_request = handle_request;