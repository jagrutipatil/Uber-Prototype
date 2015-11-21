var ejs = require("ejs");
var mq_client = require('./client');
//var bcrypt = require('bcryptjs');

function home(req, res) {
	ejs.renderFile("./views/login.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function signup(req, res) {
	var msg_payload = { "firstname": req.param("firstname"), "lastname": req.param("lastname"), 
			"email":req.param("email"), "mobile":req.param("mobile")
			,"password": req.param("password"), "requestQueue":"signup"};
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
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

exports.home = home;
exports.signup = signup;
