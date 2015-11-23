var ejs = require("ejs");
var mq_client = require('../rpc/client');

//Function for Signup
exports.signup=function(req, res) {
	var firstname = req.param("firstname");
	var lastname = req.param("lastname");
	var username = req.param("username");
	var password = req.param("password");
	var phoneno = req.param("phoneno");
	console.log("In Signup ")
	var msg_payload = { "username": username, "password": password ,"firstname": firstname, "lastname": lastname , "phoneno": phoneno, "functions": "signup"};
	console.log("In POST Request = UserName:"+ username+" "+password);
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Sign Up");
				res.send({"result":"Success"});
			}
			else {    
				
				console.log("Invalid Sign up");
				res.send({"result":"Fail"});
			}
		}  
	});		
};

//Functino for signin
exports.signin=function(req, res) {
	var username = req.param("username");
	var password = req.param("password");
	
	var msg_payload = { "username": username, "password": password , "functions":"signin"};
	console.log("In POST Request = UserName:"+ username+" "+password);
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				console.log("valid Login");
				var firstname = results.firstname ;
				var lastname = results.lastname;
				var phoneno = results.phoneno;
				res.send({"result":"Success", "firstname": firstname ,"lastname": lastname,"phoneno": phoneno});
			}
			else {    
				console.log("Invalid Login");
				res.send({"result":"Fail"});
			}
		}  
	});
};

//Default page
exports.home=function(req, res) {
	ejs.renderFile("./views/signin.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
};
