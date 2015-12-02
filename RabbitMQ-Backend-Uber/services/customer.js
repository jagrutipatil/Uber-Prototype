var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "uber.customers";

function signup(ssn, email, password, firstname, lastname, mobileno, cardno, cvv, exp_month, exp_year, postalcode, latitude, longitude, callback) {
	var res = {};
	console.log("in singup backend module");
	var sqlQuery = "INSERT INTO "+ tableName + " ( ssn, email, password, firstname, lastname, mobileno, cardno, cvv, exp_month, exp_year, postalcode, approved, latitude, longitude, rating) VALUES ( '" + ssn 
	+ "' , '" + email +
	  "' , '" + password +  
	  "' , '" + firstname  +
	  "' , '" + lastname +
	  "' , '" + mobileno +
	  "' , '" + cardno +
	  "' , '" + cvv +
	  "' , '" + exp_month +
	  "' , '" + exp_year +
	  "' , '" + postalcode +
	  "' , 'false" +
	  "' , '" + latitude +
	  "' , '" + longitude +
	  "' , '3.0'"+
	  " )";
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "success";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, sqlQuery);
}

function approve(ssn, callback) {
	var res = {};
	var sqlQuery = "UPDATE "+ tableName + " SET approved = 'true' WHERE ssn = '" + ssn+"'";
	  	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "sucess";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, sqlQuery);
}

function updateLatLng(ssn, latitude, longitude, callback) {
	var res = {};
	var sqlQuery = "UPDATE "+ tableName + " SET latitude = '"+latitude+"' , longitude = '"+longitude+"' WHERE ssn = '" + ssn+"'";
	  	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "success";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, sqlQuery);
}


function updateProfile(ssn, email, password, firstname, lastname, mobileno, callback) {
	var sqlQuery = "UPDATE "+ tableName + " SET email = '"+ email 
	    + "' , password = '"+password+"' , firstname = '"+firstname+"' , lastname = '"+lastname+"', " +
			" mobileno = '"+ mobileno +"' WHERE ssn = '" + ssn+"'";
	  	
	var res = {};
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "success";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, sqlQuery);
}

function updatePayment(ssn, cardno, cvv, exp_month, exp_year, callback) {
	var sqlQuery = "UPDATE "+ tableName + " SET cardno = '"+ cardno + "' , cvv = '" 
	+ cvv + "' , exp_month = '" + exp_month + "' , exp_year = '" + exp_year + "' WHERE ssn = '" + ssn+"'";
	  	
	var res = {};
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "success";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, sqlQuery);
}


function search_with_ssn(ssn, callback) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE ssn='"+ ssn +"'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows[0];
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}

function search_with_email(email, callback) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows[0];
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}

function search_with_name(firstname, lastname, callback) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE firstname='"+ firstname +"' AND lastname = '" + lastname + "'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}


function signin(email, password, callback) {	
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"' AND password='"+ password+"' AND approved='true'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows[0];
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}

function selectAllUnApproved(callback) {	
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE approved='false'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}


function selectAll(callback) {	
	var sqlQuery = "SELECT * FROM " + tableName ;
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}

function remove_with_ssn(ssn, callback) {	
	var sqlQuery = "DELETE FROM " + tableName + " WHERE ssn='"+ ssn +"'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "Succes Login";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "Failed Login";
		}
		callback(err, res);
	}, sqlQuery);
}

function remove_with_email(email, callback) {	
	var sqlQuery = "DELETE FROM " + tableName + " WHERE email='"+ email +"' AND password='"+ password+"'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "Succes Login";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "Failed Login";
		}
		callback(err, res);
	}, sqlQuery);
}

exports.signup = signup;
exports.signin = signin;
exports.remove_with_email = remove_with_email;
exports.remove_with_ssn = remove_with_ssn;
exports.selectAll = selectAll;
exports.search_with_name = search_with_name;
exports.search_with_email = search_with_email; 
exports.search_with_ssn = search_with_ssn;
exports.update = updateProfile;
exports.updatePayment = updatePayment;
exports.updateLatLng = updateLatLng;
exports.approve = approve;
exports.selectAllUnApproved = selectAllUnApproved;

