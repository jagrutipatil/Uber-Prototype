var ejs = require("ejs");
var mySqlDb = require("./mysqldb");


var getMinFare = function(carType){
	var minFare = 0;
	switch(carType){
	case "uberx":
		minFare = 5.35;
		break;
	case "uberxl":
		minFare = 8.35;
		break;
	case "uberSELECT":
		minFare = 10.35;
		break;
	case "uberBLACK":
		minFare = 15;
		break;
	case "uberSUV":
		minFare = 25;
		break;
	case "uberTAXI":
		minFare = 5.35;
		break;
	default:
		minFare = 5.35;
	}
	
	return minFare;
};

var getsafeRideFare = function(carType){
	var minFare = 0;
	switch(carType){
	case "uberx":
		minFare = 1.35;
		break;
	case "uberxl":
		minFare = 1.35;
		break;
	case "uberSELECT":
		minFare = 1.35;
		break;
	case "uberBLACK":
		minFare = 0;
		break;
	case "uberSUV":
		minFare = 0;
		break;
	case "uberTAXI":
		minFare = 1.35;
		break;
	default:
		minFare = 1.35;
	}
	
	return minFare;
};

var getBaseFare = function(carType){
	var baseFare = 0;
	switch(carType){
	case "uberx":
		baseFare = 2.20;
		break;
	case "uberxl":
		baseFare = 5;
		break;
	case "uberSELECT":
		baseFare = 5;
		break;
	case "uberBLACK":
		baseFare = 8;
		break;
	case "uberSUV":
		baseFare = 15;
		break;
	case "uberTAXI":
		baseFare = 5.35;
		break;
	default:
		baseFare = 5.35;
	}
	
	return baseFare;
};

var getPriceStepIncreaseTime = function(carType){
	var minFare = 0;
	switch(carType){
	case "uberx":
		minFare = 0.26;
		break;
	case "uberxl":
		minFare = 0.45;
		break;
	case "uberSELECT":
		minFare = 0.50;
		break;
	case "uberBLACK":
		minFare = 0.65;
		break;
	case "uberSUV":
		minFare = 0.90;
		break;
	case "uberTAXI":
		minFare = 0.26;
		break;
	default:
		minFare = 0.26;
	}
	
	return minFare;
};

var priceStepIncreaseDistance = function(carType){
	var minFare = 0;
	switch(carType){
	case "uberx":
		minFare = 1.30;
		break;
	case "uberxl":
		minFare = 2.15;
		break;
	case "uberSELECT":
		minFare = 2.75;
		break;
	case "uberBLACK":
		minFare = 3.75;
		break;
	case "uberSUV":
		minFare = 3.75;
		break;
	case "uberTAXI":
		minFare = 1.30;
		break;
	default:
		minFare = 1.30;
	}
	
	return minFare;
};

var getPriceDeviationPeekTime = function(startTime,endTime){
	var priceDeviation = 0;
	var day = 0;
	
	// for when time is between 11pm and 5am
	if(startTime < 5 || endTime > 23){
		priceDeviation = priceDeviation + 0.10;
		day = new Date().getDay();
		//if it is weekend
		if(day >= 4){
			priceDeviation = priceDeviation + 0.10;
		}
	}
	
	//checking for christmas and thanksgiving 
	var month = new Date().getMonth();
	if(month >= 10){
		var date = new Date().getDate();
		if(date < 23){
			priceDeviation = priceDeviation + 0.10;
		}
	}
	
	return priceDeviation;
};

var generateUniqueId = function(){
	  function s4() {
		    return Math.floor((1 + Math.random()) * 0x1000);
		  }
		  function s3() {
		    return Math.floor((1 + Math.random()) * 0x100);
		  }
		function s2() {
		    return Math.floor((1 + Math.random()) * 0x10);
		  }
		  return s3() + '-' + s2() + '-' + s4();
};

var billGenerate = function(distance, startTime, endTime, totalTime, carType, source, destination, customerId, driverId, callback){
	var billID = 0;
	var res = {};

//	var distance = req.param("distance");
//	var startTime = req.param("startTime");
//	var endTime = req.param("endTime");	
//	var totalTime = req.param("totalTime");
//	var carType = req.param("carType");
//	var source = req.param("source");
//	var destination = req.param("destination");
//	var customerId = req.param("customerId");
//	var driverId = req.param("driverId");
	var currentDate = new Date();
	console.log("distance  : " + distance);
	console.log("totalTime  : " + totalTime);
	var avgSpeed = parseInt(distance/totalTime);
	console.log("avgSpeed  : " + avgSpeed);
	var priceDeviationPeekTime = getPriceDeviationPeekTime(startTime,endTime);
	
	var baseFare = getBaseFare(carType);
	var safeRideFare = getsafeRideFare(carType);
	var priceStepIncreaseTimeVariable = getPriceStepIncreaseTime(carType);
	var priceStepIncreaseDistanceVariable = priceStepIncreaseDistance(carType);
	
	var minFare = getMinFare(carType);
	
	var price = null;
	
	if(avgSpeed >= 0 || avgSpeed !== undefined ||avgSpeed !== null){
		if(avgSpeed > 11){
			price = parseInt(baseFare) + parseInt(safeRideFare) + parseInt(parseInt(priceStepIncreaseDistanceVariable) * distance); // calculate this			
			if(price < minFare){
				price = minFare;
				console.log("Price for avg speed > 11 : " + price);
			}			
		}
		else{
			console.log("inside < 11 : and basefare " +  parseInt(baseFare));
			price = parseInt(baseFare) + parseInt(safeRideFare) + parseInt(parseInt(priceStepIncreaseTimeVariable) * totalTime); // calculate this			
			if(price < minFare){
				price = minFare;
				console.log("Price for avg speed < 11 : " + price);
			}			
		}
	}
	else{
		price = "An error occured"; 
	}	
	
	if(price!== null){
		console.log("inside fetch");
		var uniqueId = generateUniqueId();
		var insertBill = "insert into bills(billId , rideDate, pickUpTime , DropOffTime , distance, amount, sourceLocation, destinationLocation, driverId, customerId) values ('" + uniqueId + "',now(),'" + startTime + "','" + endTime + "','" + distance + "','" + price + "','" + source + "','" + destination + "','" + driverId + "','" + customerId +"')";

 //       Section for inserting in the billing table
        
		mySqlDb.executeQuery(function(err, rows) {
			if (!err) {
		    	  res.code = "200";
				  res.value = price;
			} else {
				  console.log(err);
				  res.code = "401";
				  res.value = "error";
			}
			callback(err, res);
		}, insertBill);
		
        /*mysql.executeQuery(function(err,results1){
          if(err){
            console.log(err);
			  res.code = "401";
			  res.value = "error";
          }
          else 
          {
            if(results1 !== undefined){
              console.log("Inserted Successfully ");
              res.code = "200";
			  res.value = price;
            }
            else {              
              console.log(err);
			  res.code = "401";
			  res.value = "error";                   
            }
          }
          console.log("imp 3 " + res.code);
          callback(err, res);
        },insertBill);*/		
	}
	console.log("Price for ride : " + price);
	//res.send({"price": price, "billID":billID});
};

var estimate = function(distance, startTime, endTime, totalTime, carType, callback){
	var res = {};
	var err = "Error";
//	var peakTimeIndicator = getPeakTimeIndicator();
//	var distance = req.param("distance");
//	var startTime = req.param("startTime");
//	var endTime = req.param("endTime");	
//	var totalTime = req.param("totalTime");
//	var carType = req.param("carType");
	
	var avgSpeed = parseInt(distance/(totalTime/60));
	var priceDeviationPeekTime = getPriceDeviationPeekTime(startTime,endTime);
	
	var baseFare = getBaseFare(carType);
	var safeRideFare = getsafeRideFare(carType);
	var priceStepIncreaseTimeVariable = getPriceStepIncreaseTime(carType);
	var priceStepIncreaseDistanceVariable = priceStepIncreaseDistance(carType);
	
	var minFare = getMinFare(carType);
	
	var price = 0;
	console.log("inside estimate "+avgSpeed + baseFare);
	if(avgSpeed > 0 || avgSpeed != undefined ||avgSpeed != null){
		if(avgSpeed >= 11){
			price = baseFare + safeRideFare + (priceStepIncreaseDistanceVariable * distance); // calculate this			
			if(price < minFare){
				price = minFare;
			}
			console.log(price+"estimate price");
			res.code = "200";
			res.value = price;	
			console.log(res);
			callback(err, res);
		}
		else{
			price = baseFare + safeRideFare + (priceStepIncreaseTimeVariable * totalTime); // calculate this			
			if(price < minFare){
				price = minFare;
			} 
			console.log(price+"estimate price");
			res.code = "200";
			res.value = price;	
			console.log(res);
			callback(err, res);
		}
	} 
	else{
		console.log(err);
		res.code = "401";
		res.value = "error";
		callback(err, res);
	}callback(err, res);
};

var getUserBills = function(customerId, callback){
	var res = {};
	
	var fetchData = "select * from bills where customerId='" + customerId + "'";
    //Section for fetching a particular user bills from the bill table
    console.log("Query for bills " + fetchData);
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = rows;
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, fetchData);
};

var getBill = function(customerId, driverId, callback){
	var res = {};
	//var customerId = req.param("customerId");
	//var driverId = req.param("driverId");
	
	var fetchData = "select * from bills where customerId='" + customerId + "' and driverId='" + driverId + "'";
	//Section for fetching a particular user and driver bills from the bill table
    
	mySqlDb.executeQuery(function(err, rows) {
		if (!err) {
	    	  res.code = "200";
			  res.value = rows;
		} else {
			  console.log(err);
			  res.code = "401";
			  res.value = "error";
		}
		callback(err, res);
	}, fetchData);
};

//function getDriverSummary(driverId, callback) {	
//	var sqlQuery = "SELECT COUNT(billid) FROM uber.bills where driverid='"+driverId+"'";
//	var res = {};
//	
//	mySqlDb.executeQuery(function(err, rows) {
//		if (!err) {
//			console.log("In Driver Summary Query");
//	    	  res.code = "200";
//			  res.value = rows;
//			  
//		} else {
//			  console.log(err);
//			  res.code = "401";
//			  res.value = "Failed Login";
//		}
//	}, sqlQuery);
//}

exports.billGenerate=billGenerate;
exports.estimate=estimate;
exports.getUserBills=getUserBills;
exports.getBill=getBill;
//exports.getDriverSummary = getDriverSummary;