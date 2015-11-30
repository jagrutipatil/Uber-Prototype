
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

exports.loginCustomer = loginCustomer;
exports.signupCustomer = signupCustomer;
exports.loginDriver = loginDriver;
exports.signupDriver = signupDriver;
exports.updateDriver = updateDriver;
exports.updateCustomer = updateCustomer;
exports.updatePaymentCustomer = updatePaymentCustomer;
exports.admin = admin;
exports.loginPage = loginPage;