var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "uber.drivers";

/* Driver Information
"ssn" : $scope.ssn,
				"email" : $scope.email,
				"password": $scope.password,
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"mobileno" : $scope.mobileno,
				"address":   $scope.address,
				"city":      $scope.city,
				"state":     $scope.state,
				"postalcode" : $scope.postalcode
				"dlno":      $scope.dlno,
				url
				*/


function signup(ssn, email, password, firstname, lastname, mobileno, address, city, state, postalcode, dlno,  latitude, longitude, url, callback) {
	var GoogleMapsLoader;
	var res = {};
	
	console.log("In singup backend module");	
	
	var sqlQuery = "INSERT INTO "+ tableName + " ( ssn, email, password, firstname, lastname, mobileno, address, city, state, postalcode, dlno, approved, available, latitude, longitude, url, rating) VALUES ( '" + ssn 
	+ "' , '" + email +
	  "' , '" + password +  
	  "' , '" + firstname  +
	  "' , '" + lastname +
	  "' , '" + mobileno +
	  "' , '" + address +
	  "' , '" + city +
	  "' , '" + state +
	  "' , '" + postalcode +
	  "' , '" + dlno +
	  "' , 'false"+
	  "' , 'true"+
	  "' , '" + latitude +
	  "' , '" + longitude +
	  "' , '" + url +
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

function updateRating(ssn, rating, callback) {
	var res = {};
	var sqlQuery = "UPDATE "+ tableName + " SET rating = '"+ rating+"' WHERE ssn = '" + ssn+"'";
	  	
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

function makeDriverUnavailable(ssn, callback) {
	var res = {};
	var sqlQuery = "UPDATE "+ tableName + " SET available = 'false' WHERE ssn = '" + ssn+"'";
	  	
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
			  res.value = "success";
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, sqlQuery);
}

function update(ssn, email, password, firstname, lastname, mobileno, postalcode, callback) {
	var sqlQuery = "UPDATE "+ tableName + " SET email = '"+email+ "', password = '"+password+"' , firstname = '"+firstname+"' , lastname = '"+lastname+"',mobileno = '"+mobileno+"' WHERE ssn = '" + ssn+"'";
	  	
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
//		callback(err, res);
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
				res.code = "204";				
			}			
		} else {
			console.log(err);
	        res.code = "401";
			res.value = "Failed Login";
		}
		callback(err, res);
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
				res.code = "204";
			}			
			callback(err, res);
		} else {
			console.log(err);
	        res.code = "401";
			res.value = "Failed Login";				
		}
	}, sqlQuery);	
}


function signin(email, password, callback) {	
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE email='"+ email +"' AND password='"+ password +"' AND approved='true'";
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
				res.code = "401";				
			}			
		} else {
			console.log(err);
	        res.code = "401";
			res.value = "Failed Login";
		}
		callback(err, res);
	}, sqlQuery);
}

function selectAllAvailableWithin10Miles(latitude, longitude, callback) {
	
	var sqlQuery = "SELECT ssn, firstname, lastname, ( 1320 * acos( cos( radians("+ latitude +") ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians( "+longitude +") ) + sin( radians( "+ latitude + ") ) * sin( radians( latitude ) ) ) ) AS distance FROM "+ tableName +" WHERE available='true' HAVING distance < 10 ORDER BY distance;"	
//	var sqlQuery = "SELECT * FROM " + tableName + " WHERE available='true'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				res.code = "204";				
			}			
		} else {
			console.log(err);
	        res.code = "401";
			res.value = "Failed Login";
		}
		callback(err, res);
	}, sqlQuery);
}

function ifDriverWithinRadius(latitude, longitude) {
	var R = 16093.4; // metres
	var φ1 = lat1.toRadians();
	var φ2 = lat2.toRadians();
	var Δφ = (lat2-lat1).toRadians();
	var Δλ = (lon2-lon1).toRadians();

	var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
	        Math.cos(φ1) * Math.cos(φ2) *
	        Math.sin(Δλ/2) * Math.sin(Δλ/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

	var d = R * c;	
}

function selectAllWithinRadius(callback) {	
	
}


function selectAllAvailable(callback) {	
	var sqlQuery = "SELECT * FROM " + tableName + " WHERE available='true'";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				res.code = "204";	
			}			
		} else {
			console.log(err);
	        res.code = "401";
			res.value = "Failed Login";
		}
		callback(err, res);
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
				res.code = "204";
			}			
		} else {
			console.log(err);
	        res.code = "401";
			res.value = "Failed Login";
		}
		callback(err, res);
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
exports.selectAllAvailable = selectAllAvailableWithin10Miles;
exports.search_with_name = search_with_name;
exports.search_with_email = search_with_email; 
exports.search_with_ssn = search_with_ssn;
exports.update = update;
exports.updateLatLng = updateLatLng;
exports.approve = approve;
exports.selectAllUnApproved = selectAllUnApproved;