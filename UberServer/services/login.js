//brcrypt used for hashing the password
var bcrypt = require('bcrypt');
var mongo =  require('./mongo');
var mongoURL = "mongodb://localhost:27017/logins";

function handle_request_signin(msg, callback){
	
	var res = {};
	var json_responses;
	
	console.log("In handle request:"+ msg.username);
	var username = msg.username;
	var password = msg.password;
	var functions = msg.functions;
	console.log(" functions:"+functions);
	
	if(functions == "signin"){
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('logins');

		coll.findOne({username: username, password:password}, function(err, user){
			if (user) {
				var cursor = coll.findOne({username: username, password:password});
				console.log(user.toString);
				console.log(user.firstname);
				bcrypt.compare(password, user.password, function(err, res) {
					res.code = "200";
					res.value = "Succes Login";
					res.firstname = user.firstname;
					res.lastname = user.lastname;
					res.phoneno = user.phoneno;
					callback(null, res);
				});				
				

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
				callback(null, res);
			}
		});
	});
	
	}
	
}

function handle_request_signup(msg, callback){
	var res = {};
	var json_responses;

	console.log("In handle request:"+ msg.username);
	var username = msg.username;
	var password = msg.password;
	var firstname =  msg.firstname;
	var lastname = msg.lastname;
	
	//to hash the password 
	var salt = bcrypt.genSaltSync(10);
	var hash = bcrypt.hashSync('password', salt);
	console.log("Hash: "+hash);
	
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('logins');

		coll.insertOne({username: username, password:hash , firstname: firstname, lastname: lastname}, function(err, user){
			if (user) {

				res.code = "200";
				res.value = "Succes Login";
				callback(null, res);

			} else {
				console.log("returned false");
				res.code = "401";
				res.value = "Failed Login";
				callback(null, res);
			}
		});
	});
}



exports.handle_request_signin = handle_request_signin;
exports.handle_request_signup = handle_request_signup;