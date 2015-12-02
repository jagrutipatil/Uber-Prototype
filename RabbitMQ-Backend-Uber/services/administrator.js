var ejs = require("ejs");
var mySqlDb = require("./mysqldb");
var tableName = "uber.administrators";


/* Administrators Information
                "ssn" : $scope.ssn,
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
                "address":   $scope.address,
				"city":      $scope.city,
				"state":     $scope.state,
                "zipcode" : $scope.zipcode
				"mobileno" : $scope.mobileno,
				"email" : $scope.email,
				"password": $scope.password,
				
				*/

function reviewDriver(callback) {
	var sqlQuery = "SELECT * FROM drivers WHERE approved='true';";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}


function reviewCustomer(callback) {
	var sqlQuery = "SELECT * FROM customers WHERE approved='true';";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}



function searchbill_by_driverid(driverId, callback) {
    
    
	var sqlQuery = "SELECT billId,rideDate,pickUpTime,DropOffTime,distance,amount,sourceLocation,destinationLocation,driverId,customerId FROM bills WHERE driverId='"+ driverId +"';";
   
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "Error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}

function searchbill_by_customerid(customerId,callback) {
	var sqlQuery = "SELECT * FROM bills WHERE customerId='"+ customerId +"';";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);	
}


function searchbill_by_billid(billId, callback) {
	var sqlQuery = "SELECT * FROM bills WHERE billId='"+ billId +"';";
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

function searchbill_by_date(rideDate, callback) {
	var sqlQuery = "SELECT * FROM bills WHERE rideDate='"+ rideDate+"';";
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




function rides_perdriver(callback) {	
	var sqlQuery = "SELECT driver_id,COUNT(ride_id) as totalri FROM rides GROUP BY driver_id;";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
                console.log(rows);
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}


function rides_percustomer(callback) {	
	var sqlQuery = "SELECT  cust_id,COUNT(ride_id) as totalric FROM rides GROUP BY cust_id;";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}


function rides_perpickuplocation(callback) {	
	var sqlQuery = "SELECT origin,COUNT(ride_id) as totalrides FROM rides GROUP BY origin;";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}

function rides_perdropofflocation(callback) {	
	var sqlQuery = "SELECT dest,COUNT(ride_id) as totalridesp FROM rides GROUP BY dest;";
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}

function revenueperday(callback) {	
	var sqlQuery = "SELECT Date(rideDate) as datee,SUM(amount) as total FROM bills GROUP BY Date(rideDate);" ;
	var res = {};
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}


function deletebill_billId(billId,callback) {	
	var sqlQuery = "DELETE FROM bills WHERE billId='" + billId + "';";    
	var res = {};              
	
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
			if (rows.length > 0) {
				res.value = rows;
				res.code = "200";
			} else {
				console.log(err);
		        res.code = "401";
				res.value = "error";				
			}			
			callback(err, res);
		}
	}, sqlQuery);
}



exports.reviewDriver = reviewDriver;
exports.reviewCustmer= reviewCustomer;

exports.searchbill_by_driverid = searchbill_by_driverid;
exports.searchbill_by_customerid = searchbill_by_customerid;
exports.searchbill_by_billid = searchbill_by_billid;
exports.searchbill_by_date= searchbill_by_date;

exports.rides_perdriver = rides_perdriver; 
exports.rides_percustomer = rides_percustomer;
exports.rides_perpickuplocation = rides_perpickuplocation;
exports.rides_perdropofflocation = rides_perdropofflocation;

exports.revenueperday = revenueperday;
exports.deletebill_billId = deletebill_billId;