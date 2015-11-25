var mysql = require('./mysql');


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

var billGenerate = function(req,res){
	var billID = 0;

	var distance = req.param("distance");
	var startTime = req.param("startTime");
	var endTime = req.param("endTime");	
	var totalTime = req.param("totalTime");
	var carType = req.param("carType");
//	var source = req.param("source");
//	var destination = req.param("destination");
//	var customerId = req.param("customerId");
//	var driverId = req.param("driverId");
	var currentDate = new Date();
	console.log("distance  : " + distance);
	console.log("totalTime  : " + totalTime);
	var avgSpeed = distance/totalTime;
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
	
/*	if(price!== null){
		var uniqueId = generateUniqueId();
		var insertBill = "insert into bills(ID , date, pickUpTime , DropOffTime , distance, amount, sourceLocation, destinationLocation, driverId, customerId) values ('" + uniqueId + "','" + currentDate + "','" + startTime + "','" + endTime + "','" + distance + "','" + price + "','" + source + "','" + destination + "','" + driverId + "','" + customerId +"')";

        Section for inserting in the billing table
        
        mysql.fetchData(function(err,results1){
          if(err){
            throw err;
          }
          else 
          {
            if(results1 !== undefined){
              console.log("Inserted Successfully ");
            }
            else {              
              console.log("Failed to insert");                  
              res.end('An error occurred');
              console.log(err);                   
            }
          }
        },insertBill);		
	}*/
	console.log("Price for ride : " + price);
	res.send({"price": price, "billID":billID});
};

var estimate = function(req,res){
	var peakTimeIndicator = getPeakTimeIndicator();
	var distance = req.param("distance");
	var startTime = req.param("startTime");
	var endTime = req.param("endTime");	
	var totalTime = req.param("totalTime");
	var carType = req.param("carType");
	
	var avgSpeed = distance/totalTime;
	var priceDeviationPeekTime = getPriceDeviationPeekTime(startTime,endTime);
	
	var baseFare = getBaseFare(carType);
	var safeRideFare = getsafeRideFare(carType);
	var priceStepIncreaseTimeVariable = getPriceStepIncreaseTime(carType);
	var priceStepIncreaseDistanceVariable = priceStepIncreaseDistance(carType);
	
	var minFare = getMinFare(carType);
	
	var price = 0;
	
	if(avgSpeed <= 0 || avgSpeed === undefined ||avgSpeed === null){
		if(avgSpeed >= 11){
			price = baseFare + safeRideFare + (priceStepIncreaseDistanceVariable * distance); // calculate this			
			if(price < minFare){
				price = minFare;
			}			
		}
		else{
			price = baseFare + safeRideFare + (priceStepIncreaseTimeVariable * totalTime); // calculate this			
			if(price < minFare){
				price = minFare;
			}			
		}
	}
	else{
		price = "An error occured"; 
	}	
	
	res.send({price:price});
};

var getUserBills = function(req,res){
	var customerId = req.param("customerId");
	
	var fetchData = "select * from bills where customerId='" + customerId + "'";
    //Section for fetching a particular user bills from the bill table
    
    mysql.fetchData(function(err,results1){
      if(err){
        throw err;
      }
      else 
      {
        if(results1 !== undefined){
          console.log("Inserted Successfully ");
        }
        else {              
          console.log("Failed to insert");                  
          res.end('An error occurred');
          console.log(err);                   
        }
      }
    },fetchData);
};

var getBill = function(req,res){
	var customerId = req.param("customerId");
	var driverId = req.param("driverId");
	
	var fetchData = "select * from bills where customerId='" + customerId + "' and driverId='" + driverId + "'";
	//Section for fetching a particular user and driver bills from the bill table
    
    mysql.fetchData(function(err,results1){
      if(err){
        throw err;
      }
      else 
      {
        if(results1 !== undefined){
          console.log("Inserted Successfully ");
        }
        else {              
          console.log("Failed to insert");                  
          res.end('An error occurred');
          console.log(err);                   
        }
      }
    },fetchData);
};

exports.billGenerate=billGenerate;
exports.estimate=estimate;
exports.getUserBills=getUserBills;
exports.getBill=getBill;