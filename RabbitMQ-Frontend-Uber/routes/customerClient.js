
var ejs = require("ejs");
var mq_client = require('./client');
//var bcrypt = require('bcryptjs');

//function home(req, res) {
//	ejs.renderFile("./views/login.ejs", function(err, result) {
//		if (!err) {
//			res.end(result);
//		}
//	});
//}
		
function signup(req, res) {
	var msg_payload = { "ssn": req.param("ssn"), "email": req.param("email"), 
			"password":req.param("password"), "firstname":req.param("firstname")
			,"lastname": req.param("lastname"),"mobileno": req.param("mobileno"),
			"cardno": req.param("cardno"), "cvv": req.param("cvv"), "exp_month": req.param("exp_month"),
			"exp_year": req.param("exp_year"),"postalcode": req.param("postalcode"),
			"latitude": req.param("latitude"),"longitude": req.param("longitude"),
			"requestQueue":"signup"};
	console.log(msg_payload);
	mq_client.make_request('customer',msg_payload, function(err,results){
		console.log("Got callback from server");
			if(results.code == 200){
				console.log("Inserted customer entry sucessfully");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


function signin(req, res) {
	var msg_payload = { "email": req.param("email"), "password": req.param("password"),"requestQueue":"signin"};	
	mq_client.make_request('customer',msg_payload, function(err,results){			
		    console.log(results);
			if(results.code === "200"){
				console.log("valid login");
				req.ubersession.user = results.value;
				console.log("Printing session\n\n");
				res.send({"value": results.value, "result":"success"});			
				
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function remove_with_email(req, res) {
	var msg_payload = { "email": req.param("email"),"requestQueue":"remove_with_email"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}

function remove_with_ssn(req, res) {
	var msg_payload = { "ssn": req.param("ssn"),"requestQueue":"remove_with_ssn"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function selectAll(req, res) {
	var msg_payload = {"requestQueue":"selectAll"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function updateLatLng(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "latitude": req.param("latitude"), 
			"longitude": req.param("longitude"),"requestQueue":"updateLatLng"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


function selectAllUnApproved(req, res) {
	var msg_payload = {"requestQueue":"selectAllUnApproved"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");
				res.send({"value": results.value,"result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function search_with_name(req, res) {
	var msg_payload = {"firstname": req.param("firstname"), "lastname": req.param("lastname"), "requestQueue":"search_with_name"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");		
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function search_with_ssn(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "requestQueue":"search_with_ssn"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function update(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "email":req.param("email"), "password":req.param("password"),
			"firstname":req.param("firstname"), "lastname": req.param("lastname"),
			"mobileno": req.param("mobileno"), "requestQueue":"update"};
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid update");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid update");
				res.send({"result":"error"});
			}
	});
}

function updatePayment(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "cardno": req.param("cardno"),"cvv": req.param("cvv"),
			"exp_month": req.param("exp_month") , "exp_year": req.param("exp_year"),
			"requestQueue":"updatePayment"};
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid update");				
				res.send({"result":"success"});
			} else {    
				console.log("Invalid update");
				res.send({"result":"error"});
			}
	});
}

function approve(req, res) {
	var msg_payload = {"ssn": req.param("ssn"), "requestQueue":"approve"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
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

function search_with_email(req, res) {
	var msg_payload = {"email": req.param("email"), "requestQueue":"search_with_email"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"value": results.value, "result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}

function rating(req, res) {
	var msg_payload = {"rating": req.param("rating"), "feedback": req.param("feedback"), "requestQueue": "customerRating"};	
	console.log(msg_payload);
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"value": result.value, "result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}

exports.getImage = function(req, res){
    ejs.renderFile("./views/getImage.ejs", function(err, result) {
        if (!err) {
            res.end(result);
        }
    });
};

exports.renderAddImagesToRide = function(req, res){
	  ejs.renderFile("./views/addImagesToRide.ejs", function(err, result) {
	        if (!err) {
	            res.end(result);
	        }
	    });
	};

exports.addImagesToRide = function(req, res){
	    var mongoose = require('mongoose');
	    var Schema = mongoose.Schema;
	    var conn = mongoose.createConnection('mongodb://localhost:27017/neuber');

	    var mongo = require("mongo");
	    var mongoURL = "mongodb://localhost:27017/users";
	    
	    var fs = require('fs');
	    console.log(req.ubersession.user.ssn);
	    var Grid = require('gridfs-stream');
	    var uid = require('uid2');
	    
	    Grid.mongo = mongoose.mongo;

	    var dirname = require('path').dirname(__dirname);
	    var filename = req.files.file.name;
	    var extension = req.files.file.path.split(/[. ]+/).pop();
	    var targetName = req.ubersession.user.ssn +'_' + uid(22) + '.' + extension;  
	    var path = req.files.file.path;
	    var type = req.files.file.mimetype;

	    conn.once('open', function () {
	        console.log('open');
	        var gfs = Grid(conn.db);

	        var writestream = gfs.createWriteStream({
	            filename: targetName
	        });
	        fs.createReadStream(path).pipe(writestream);
	        writestream.on('close', function (file) {
	        	//ADD value to customer database	       
	            console.log(targetName + 'Written To DB');
	            res.send({"value": targetName, "result":"success"});
	        });
	        
	    });
	};



exports.getImagesOfRide = function (req, res) {
		res.set('Content-Type', 'image');
	    var image = req.param('image');
	    var mongoose = require('mongoose');
	    var Schema = mongoose.Schema;

	    var conn = mongoose.createConnection('mongodb://localhost:27017/neuber');
	    var fs = require('fs');

	    var Grid = require('gridfs-stream');
	    Grid.mongo = mongoose.mongo;

	    conn.once('open', function () {
	        console.log('open');
	        console.log('image name ' + image);
	        var gfs = Grid(conn.db);
	        gfs.createReadStream({
	            filename: image
	        }).pipe(res);
	    });
	};


exports.signup = signup;
exports.signin = signin;
exports.remove_with_email = remove_with_email;
exports.remove_with_ssn = remove_with_ssn;
exports.selectAll = selectAll;
exports.selectAllUnApproved = selectAllUnApproved;
exports.search_with_name = search_with_name;
exports.search_with_email = search_with_email; 
exports.search_with_ssn = search_with_ssn;
exports.update = update;
exports.updateLatLng = updateLatLng;
exports.updatePayment = updatePayment;
exports.approve = approve;
exports.rating = rating;