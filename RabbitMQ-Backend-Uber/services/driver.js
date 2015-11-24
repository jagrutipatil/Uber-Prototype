var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "testdb.drivers";

/* Driver Information
 driverid, ssn, First Name
 Last Name,Address,City,State,Zip Code,Phone number,Email,Car details,Rating,Reviews
 Own introduction in form of images and video.,Rides history
*/

function signup(ssn, email, password, firstname, lastname, address, city, state, postalcode, mobileno, carno,callback) {
	var sqlQuery = "INSERT INTO "+ tableName + " ( ssn, email, password, firstname, lastname, address, city, state, postalcode, mobileno, carno, approved) VALUES ( '" + email 
	+ "' , '" + ssn +
	  "' , '" + password +  
	  "' , '" + firstname  +
	  "' , '" + lastname +
	  "' , '" + address +
	  "' , '" + city +
	  "' , '" + state +
	  "' , '" + postalcode +
	  "' , '" + mobileno +
	  "' , '" + carno +
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


function selectAll(email, password) {	
	var sqlQuery = "SELECT * FROM " + tableName ;
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.val = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Failed Login";				
			}			
		}
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

function update(ssn, email, password, firstname, lastname, address, city, state, postalcode, mobileno, carno, callback) {
	var sqlQuery = "UPDATE "+ tableName + " SET email = '"+ email 
	+ "', password = '"+ password +"' , firstname = '"+ firstname +"' , lastname = '"+ lastname +"', +" +
	+ "', address = '"+ address +"' , city = '"+ city+"' , state = '"+ state +"', " +
	" carno = '"+ carno +"', mobileno = '"+ mobileno +"', postalcode = '"+ postalcode +"') WHERE ssn = '" + ssn+"'";
	  	
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

function search_with_ssn(ssn) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE ssn='"+ ssn +"'";
	
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
			callback(res);
		}
	}, sqlQuery);	
}

function search_with_email(email) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"'";
	
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
			callback(res);
		}
	}, sqlQuery);	
}

function search_with_name(firstname, lastname) {
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE firstname='"+ firstname +"' AND lastname = '" + lastname + "'";
	
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
			callback(res);
		}
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
			callback(res);
		}
	}, sqlQuery);
}


function selectAll() {	
	var sqlQuery = "SELECT * FROM " + tableName ;
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.val = rows;
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

function remove_with_ssn(ssn) {	
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

function remove_with_email(email) {	
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