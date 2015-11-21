var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "testdb.drivers";

function signup(email, password, firstname, lastname, mobileno, city, callback) {
	var sqlQuery = "INSERT INTO "+ tableName + " ( email, password, firstname, lastname, mobileno, cardno, cvv, ex_date, postalcode) VALUES ( '" + email 
	+ "' , '" + password +  
	  "' , '" + firstname  +
	  "' , '" + lastname +
	  "' , '" + mobileno +
	  "' , '" + city +
	  "' )";
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "Succes Login";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "Failed Login";
		}
		callback(res);
	}, sqlQuery);
}


function signin(email, password) {	
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"' AND password='"+ password+"'";
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.val = rows[0];
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
		}
	}, sqlQuery);
}

//TODO add car's information

function remove(email, password) {	
	var sqlQuery = "DELETE FROM " + tableName + " WHERE email='"+ email +"' AND password='"+ password+"'";
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "Succes Login";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "Failed Login";
		}
	}, sqlQuery);
}

exports.signup = signup;
exports.signin = signin;
exports.remove = remove;