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
//	var salt = bcrypt.genSaltSync(10);
//	var password = bcrypt.hashSync(req.param("password"), salt);

	var msg_payload = { "username": req.param("username"), "password": req.param("password"), 
			"firstname":req.param("firstname"), "lastname":req.param("lastname")
			,"gender": req.param("gender"), "requestQueue":"signup"};
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"login":"Success"});
			} else {    
				console.log("Invalid Login");
				res.send({"login":"Fail"});
			}
	});
}

function signin(req, res) {
//	var salt = bcrypt.genSaltSync(10);
//	var password = bcrypt.hashSync(req.param("password"), salt);
//	
	var msg_payload = { "username": req.param("username"), "password": req.param("password")
			, "requestQueue":"signin"};
	
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
					var user = results.val;
					console.log(user.fName + " " + user.lName);
					res.send({"result":"Login Successfull", "firstname": user.fName, 
						"lastname": user.lName, 
						"gender": user.gender,
						"phoneno": user.phone,
						"work": user.work,
						"education": user.education,
						"friends" : user.friends,
						"friendReqs" : user.friendReqs,
						"friendReqsSent" : user.friendReqsSent
						});
			}else {    
				res.send({"result":('error')});
			}
	});
}


function profile(req, res) {
	ejs.renderFile("./views/profile.ejs", function(err, result) {
		if (!err) {			
			res.end(result);
		}
	});
}

function profileHome(req, res) {
	ejs.renderFile("./views/profileHome.ejs", function(err, result) {
		if (!err) {			
			res.end(result);
		}
	});
}


function logout(req, res) {
	//clear the session
	console.log("You are in logout");
	res.redirect('/afterlogout');
	res.send({"result":('Logout Successfull')});
}

function afterlogout(req, res) {
	console.log("You are in afterlogout");
	ejs.renderFile("./views/afterlogout.ejs", function(err, result) {
		if (!err) {
			console.log("No error- in afterlogout now");
			res.end(result);
		}
	});
}

exports.home = home;
exports.signup = signup;
exports.signin = signin;
exports.logout = logout;
exports.afterlogout = afterlogout;
exports.profile = profile;
exports.profileHome = profileHome;