var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "testdb.customers";

function signup(ssn, email, password, firstname, lastname, mobileno, cardno, cvv, exp_date, postalcode, callback) {
	var sqlQuery = "INSERT INTO "+ tableName + " ( ssn, email, password, firstname, lastname, mobileno, cardno, cvv, ex_date, postalcode, approved) VALUES ( '" + email 
	+ "' , '" + ssn +
	  "' , '" + password +  
	  "' , '" + firstname  +
	  "' , '" + lastname +
	  "' , '" + mobileno +
	  "' , '" + cardno +
	  "' , '" + cvv +
	  "' , '" + exp_date +
	  "' , '" + postalcode +
	  "' , ' false' )";
	
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

function approve(ssn, callback) {
	var sqlQuery = "UPDATE "+ tableName + " SET approved = 'true' WHERE ssn = '" + ssn+"'";
	  	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "Succes approve";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "Failed approve";
		}
		callback(res);
	}, sqlQuery);
}

function update(ssn, email, password, firstname, lastname, mobileno, postalcode, callback) {
	var sqlQuery = "UPDATE "+ tableName + " SET email = '"+ email 
	+ "', password = '"+password+"' , firstname = '"+firstname+"' , lastname = '"+lastname+"', +" +
			" mobileno = '"+mobileno+"', postalcode = '"+postalcode+"') WHERE ssn = '" + ssn+"'";
	  	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = "Succes update";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "Failed update";
		}
		callback(res);
	}, sqlQuery);
}

function search_with_ssn(ssn, callback) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE ssn='"+ ssn +"'";
	
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
			callback(res);
		}
	}, sqlQuery);	
}

function search_with_email(email, callback) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"'";
	
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
			callback(res);
		}
	}, sqlQuery);	
}

function search_with_name(firstname, lastname, callback) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE firstname='"+ firstname +"' AND lastname = '" + lastname + "'";
	
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
			callback(res);
		}
	}, sqlQuery);	
}


function signin(email, password, callback) {	
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"' AND password='"+ password+"'";
	
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
			callback(res);
		}
	}, sqlQuery);
}

function selectAll(callback) {	
	var sqlQuery = "SELECT * FROM " + tableName ;
	
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
			callback(res);
		}
	}, sqlQuery);
}

function remove_with_ssn(ssn, callback) {	
	var sqlQuery = "DELETE FROM " + tableName + " WHERE ssn='"+ ssn +"'";
	
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

function remove_with_email(email, callback) {	
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
		callback(res);
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
exports.update = update;
exports.approve = approve;