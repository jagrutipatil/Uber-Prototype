
var ejs = require("ejs");
var mq_client = require('./client');
var http = require('http');

function loginCustomer(req, res) {
	ejs.renderFile("./views/loginCustomer.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function requestRide(req, res) {
    ejs.renderFile("./views/RequestRide.ejs", function(err, result) {
        if (!err) {
            res.end(result);
        }
    });
}

function signupCustomer(req, res) {
	ejs.renderFile("./views/SignupCustomer.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}


function loginDriver(req, res) {
	ejs.renderFile("./views/loginDriver.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function customerDashboard(req, res) {
	ejs.renderFile("./views/customerDashboard.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function driverDashboard(req, res) {
	ejs.renderFile("./views/driverDashboard.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}


function signupDriver(req, res) {
	ejs.renderFile("./views/SignupDriver.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function updateDriver(req, res) {
	ejs.renderFile("./views/UpdateDriver.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function updateCustomer(req, res) {
	//ejs.renderFile("./views/UpdateCustomer.ejs", function(err, result) {
	ejs.renderFile("./views/UberProfile.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function updatePaymentCustomer(req, res) {
	ejs.renderFile("./views/UberPayment.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function admin(req, res) {
			ejs.renderFile("./views/administrator.ejs", function(err, result) {
				if (!err) {
					res.end(result);
				}
			});
}

function loginPage(req, res) {
	ejs.renderFile("./views/loginPage.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function home(req, res) {
	ejs.renderFile("./views/homepage.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

function delete_customer(req , res){
	var msg_payload = { "ssn": req.ubersession.user.ssn,"requestQueue":"remove_with_ssn"};	
	mq_client.make_request('customer',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				req.ubersession.reset();
				res.redirect('/');
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}



function delete_driver(req , res){
	var msg_payload = { "ssn": req.ubersession.driver.ssn,"requestQueue":"remove_with_ssn"};	
	mq_client.make_request('driver',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				req.ubersession.reset();
				res.redirect('/');
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

exports.customerRating = function(req, res){
	ejs.renderFile("./views/customerRating.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

exports.driverRating = function(req, res){
	ejs.renderFile("./views/driverRating.ejs", function(err, result) {
		if (!err) {
			res.end(result);
		}
	});
}

exports.index = function(req, res){
	  res.render('index', { title: 'Express' });
	};
exports.index2 = function(req, res){
	  res.render('index2', { title: 'Express' });
};

exports.loginCustomer = loginCustomer;
exports.signupCustomer = signupCustomer;
exports.loginDriver = loginDriver;
exports.signupDriver = signupDriver;
exports.updateDriver = updateDriver;
exports.updateCustomer = updateCustomer;
exports.updatePaymentCustomer = updatePaymentCustomer;
exports.admin = admin;
exports.loginPage = loginPage;
exports.home = home;
exports.customerDashboard = customerDashboard;

exports.driverDashboard = driverDashboard;

exports.delete_customer = delete_customer;
exports.delete_driver = delete_driver;
exports.requestRide = requestRide;

