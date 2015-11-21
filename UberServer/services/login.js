var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/users";

function handle_request(msg, callback){	
	var res = {};	
	if(msg.requestQueue=="signup"){
		signup(msg, function(res) {
			callback(null, res);
		});
	}
 }


function signup(msg, callback) {	
	mongo.connect(mongoURL, function(){
		var coll = mongo.collection('users');
		var res = {};
		coll.insert({"firstname": msg.firstname, "lastname":msg.lastname,"email":msg.email, "mobile":msg.mobile, "password":msg.password}, function (err, result) {
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


exports.handle_request = handle_request;