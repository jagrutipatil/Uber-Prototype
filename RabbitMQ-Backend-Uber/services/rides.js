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


exports.register = register;
