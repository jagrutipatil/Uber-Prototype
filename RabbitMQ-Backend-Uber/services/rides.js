var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "uber.rides";

function register(ride_id, cust_id, driver_id, origin, dest, date, distance, duration, flag, callback) {
	var res = {};
	console.log("in register rider backend module");
	var sqlQuery = "INSERT INTO "+ tableName + " (ride_id, cust_id, driver_id, origin, dest, date, distance, duration, flag) VALUES ('"+ride_id+"', '"+cust_id+"', '"+driver_id+"', '"+origin+"', '"+dest+"', '"+date+"', '"+distance+"', '"+duration+"', '"+flag+"')";
	
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

function d_ratings(rating, feedback, cust_id, callback) {
	var res = {};
	console.log("Updating driver rating");
	var sqlQuery = "UPDATE "+ tableName + " SET d_ratings = '"+ rating 
    + "' , d_feedback = '"+feedback+"' WHERE cust_id = '" +cust_id+"'";
	
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

function c_ratings(rating, feedback, driver_id, callback) {
	var res = {};
	console.log("Updating driver rating");
	var sqlQuery = "UPDATE "+ tableName + " SET c_ratings = '"+ rating 
    + "' , c_feedback = '"+feedback+"' WHERE driver_id = '" +driver_id+"'";
	
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

exports.d_ratings = d_ratings;
exports.c_ratings = c_ratings;

exports.register = register;
