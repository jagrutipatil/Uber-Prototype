var app = angular.module('administrator', []);
app.controller("adminController", adminController);
adminController.$inject = [ '$scope', '$http', '$window'];





function adminController($scope, $http, $window) {
    
    
    
    	
	/*call API for unapproved customers*/
	$http({
		method : 'POST',
		url : '/bk_customer_selectAllUnApproved',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.approveCustomers = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCust = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCust.number = $scope.count; 
				tempCust.firstname = value.firstname;
				tempCust.lastname = value.lastname;
				tempCust.ssn = value.ssn;
				$scope.approveCustomers.push(tempCust);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	/*End API Call for unapproved customers*/
    
    
	/*call API for unapproved drivers*/
	$http({
		method : 'POST',
		url : '/bk_driver_selectAllUnApproved',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.approveDrivers = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCust = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCust.number = $scope.count; 
				tempCust.firstname = value.firstname;
				tempCust.lastname = value.lastname;
				tempCust.ssn = value.ssn;
				$scope.approveDrivers.push(tempCust);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	/*End API Call for unapproved drivers*/
    
    
  
    
    /*review customer */
    $http({
		method : 'POST',
		url : '/bk_customer_selectAll',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.customers = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCust = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCust.number = $scope.count; 
				tempCust.firstname = value.firstname;
				tempCust.lastname = value.lastname;
				tempCust.ssn = value.ssn;
                tempCust.email = value.email;
                tempCust.password = value.password;
                tempCust.mobileno = value.mobileno;
                tempCust.cardno = value.cardno;
                tempCust.cardno = value.cvv;
                tempCust.cvv = value.cardno;
                tempCust.exp_month = value.exp_month;
                tempCust.exp_year = value.exp_year;
                tempCust.postalcode = value.postalcode;
             
				$scope.customers.push(tempCust);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    
    
    /*review driver */
    $http({
		method : 'POST',
		url : '/bk_driver_selectAll',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.drivers = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCustD = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCustD.number = $scope.count; 
				tempCustD.firstname = value.firstname;
				tempCustD.lastname = value.lastname;
				tempCustD.ssn = value.ssn;
                tempCustD.email = value.email;
                tempCustD.password = value.password;
                tempCustD.mobileno = value.mobileno;
                tempCustD.address = value.address;
                tempCustD.city = value.city;
                tempCustD.state = value.state;
                tempCustD.dlno = value.dlno;
                tempCustD.postalcode = value.postalcode;
             
				$scope.drivers.push(tempCustD);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    
    
    
    
    /* revenue per day */
    $http({
		method : 'POST',
		url : '/bk_admin_revenueperday',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.revenues = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCustR = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCustR.number = $scope.count; 
				tempCustR.datee = value.datee;
				tempCustR.total = value.total;
				$scope.revenues.push(tempCustR);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    
    
    
    
    
     /* ride areawise- origin */
    $http({
		method : 'POST',
		url : '/bk_admin_rides_perpickuplocation',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.administrators = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCustA = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCustA.number = $scope.count; 
				tempCustA.origin = value.origin;
				tempCustA.totalrides = value.totalrides;
				$scope.administrators.push(tempCustA);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    
    
    
    
    /* ride areawise - dropoff */
    $http({
		method : 'POST',
		url : '/bk_admin_rides_perdropofflocation',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.dropoffs = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCustDrop = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCustDrop.number = $scope.count; 
				tempCustDrop.dest = value.dest;
				tempCustDrop.totalridesp = value.totalridesp;
				$scope.dropoffs.push(tempCustDrop);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    
    
    
    
    /* ride - driverwise */
    $http({
		method : 'POST',
		url : '/bk_admin_rides_perdriver',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.rideds = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCustDr = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCustDr.number = $scope.count; 
				tempCustDr.totalri = value.totalri;
				tempCustDr.driver_id = value.driver_id;
				$scope.rideds.push(tempCustDr);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    

    
     /* ride - customerwise */
    $http({
		method : 'POST',
		url : '/bk_admin_rides_percustomer',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.ridecs = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCustCu = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCustCu.number = $scope.count; 
				tempCustCu.totalric = value.totalric;
				tempCustCu.cust_id = value.cust_id;
				$scope.ridecs.push(tempCustCu);
				
			})
			
		} else {
			console.log("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
    
    
	
	/* API call for approving a customer */
	$scope.update = function(ssnNumber) {
		console.log('here');
		$http({
			method : 'POST',
			url : '/bk_customer_approve',
			data : {
				"ssn" : ssnNumber
			}
		}).success(function(response) {
			if (response.result != "error") {
				
				$window.location.reload();
			} else {
				console.log("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
	/*End API call for approving a customer*/
    
    
    
    
    /* API call for approving a customer */
	$scope.generate = function(driver_id) {
        console.log(driver_id);
        $scope.driver_id = driver_id;
 /* Searchh bill - Driver id */
	    $http({
			method : 'POST',
			url : '/bk_admin_searchbill_by_driverid',
			data : {            
	            "driver_id" : $scope.driver_id
			}
		}).success(function(response) {
			if (response.result != "error") {
				console.log(response.value);
                $scope.DBs = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempDB = {};
				$scope.count = parseInt($scope.count) + 1;
				tempDB.number = $scope.count; 
				tempDB.driverId = value.driverId;
                tempDB.billId = value.billId;
                tempDB.rideDate = value.rideDate;
                tempDB.pickUpTime = value.pickUpTime;
                tempDB.DropOffTime= value.DropOffTime;
                tempDB.distance = value.distance;
                tempDB.amount = value.amount;
				tempDB.sourceLocation = value.sourceLocation;
                tempDB.destinationLocation= value.destinationLocation;
                tempDB.customerId = value.customerId;
                
				$scope.DBs.push(tempDB);
				
			})
                
                
				
			} else {
				console.log("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
    
	};
    
    
    
    /* API call for approving a customer */
	$scope.generate1 = function(customerId) {
        console.log(customerId);
        $scope.customerId =customerId;
 /* Searchh bill - Driver id */
	    $http({
			method : 'POST',
			url : '/bk_admin_searchbill_by_customerid',
			data : {            
	            "customer_id" : $scope.customerId
			}
		}).success(function(response) {
			if (response.result != "error") {
				console.log(response.value);
                $scope.CBs = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCB = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCB.number = $scope.count; 
				tempCB.driverId = value.driverId;
                tempCB.billId = value.billId;
                tempCB.rideDate = value.rideDate;
                tempCB.pickUpTime = value.pickUpTime;
                tempCB.DropOffTime= value.DropOffTime;
                tempCB.distance = value.distance;
                tempCB.amount = value.amount;
				tempCB.sourceLocation = value.sourceLocation;
                tempCB.destinationLocation= value.destinationLocation;
                tempCB.customerId = value.customerId;
                
				$scope.CBs.push(tempCB);
				
			})
                
                
				
			} else {
				console.log("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
    
	};
    
    
    /* API call for approving a customer */
	$scope.generate2 = function(billId) {
        console.log(billId);
        $scope.billId =billId;
 /* Searchh bill - Driver id */
	    $http({
			method : 'POST',
			url : '/bk_admin_searchbill_by_billid',
			data : {            
	            "billId" : $scope.billId
			}
		}).success(function(response) {
			if (response.result != "error") {
				console.log(response.value);
                $scope.BBs = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempBB = {};
				$scope.count = parseInt($scope.count) + 1;
				tempBB.number = $scope.count; 
				tempBB.driverId = value.driverId;
                tempBB.billId = value.billId;
                tempBB.rideDate = value.rideDate;
                tempBB.pickUpTime = value.pickUpTime;
                tempBB.DropOffTime= value.DropOffTime;
                tempBB.distance = value.distance;
                tempBB.amount = value.amount;
				tempBB.sourceLocation = value.sourceLocation;
                tempBB.destinationLocation= value.destinationLocation;
                tempBB.customerId = value.customerId;
                
				$scope.BBs.push(tempBB);
				
			})
				
			} else {
				console.log("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
    
	};
    
	/*End API call for approving a customer*/
    
    
	/* API call for approving a driver */
	$scope.update2 = function(ssnNumber) {
		console.log('here');
		$http({
			method : 'POST',
			url : '/bk_driver_approve',
			data : {
				"ssn" : ssnNumber
			}
		}).success(function(response) {
			if (response.result != "error") {
				
				$window.location.reload();
			} else {
				console.log("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
	/*End API call for approving a driver*/
}



