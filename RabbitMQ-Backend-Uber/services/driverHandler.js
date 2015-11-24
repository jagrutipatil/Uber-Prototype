var ejs = require("ejs");
var driver = require("./driver");


function handle_request(msg, callback){	
	var res = {};	
	if(msg.requestQueue=="signup"){
		driver.signup(msg.email, msg.password, msg.firstname, msg.lastname, msg.mobileno, msg.carno, msg.cvv, msg.expno, msg.postalcode, function(res) {
			callback(res);
		});
	}
	
	if(msg.requestQueue=="signin_customer"){
		driver.signin(msg.email, msg.password, function(res) {
			callback(res);
		});
	}
	
	if(msg.requestQueue=="delete_customer"){
		driver.remove(msg, function(res) {
			callback(null, res);
		});
	}
	
 }


exports.handle_request = handle_request;