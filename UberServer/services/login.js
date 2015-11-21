var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/users";

function handle_request(msg, callback){	
	var res = {};
	
	if(msg.requestQueue=="signin"){
		signin(msg, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="signup"){
		signup(msg, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="home"){
		home(msg, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="logout"){
		logout(msg, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="afterlogout"){
		checklogin(msg, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="profile"){
		checklogin(msg, function(res) {
			callback(null, res);
		});
	}
	
	if(msg.requestQueue=="profileHome"){
		checklogin(msg, function(res) {
			callback(null, res);
		});
	}
 }




function home(req, res) {
	ejs.renderFile("./views/login.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function signup(msg, callback) {	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		var res = {};
		coll.insert({"uname": msg.username, "password":msg.password,"fName":msg.firstname, "lName":msg.lastname, "gender":msg.gender}, function (err, result) {
		      if (!err) {
		    	  res.code = "200";
				  res.value = "Succes Login";
		        } else {
		        	console.log(err);
			        res.code = "401";
					res.value = "Failed Login";
		        }
		        //Close connection
		        mongo.close();
		        callback(res);
		      });		
	});
}

function signin(msg, callback) {
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('users');
		var res = {};
		
		coll.findOne({uname: msg.username, password:msg.password}, function(err, user){
			if (user) {
				console.log(user.fName + " " + user.lName);
				res.val = user;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";
			}
			//Close connection
	        mongo.close();
			callback(res);
		});
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
exports.handle_request = handle_request;