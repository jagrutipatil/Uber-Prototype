var app=angular.module('SinglePageDriver',['ngRoute']);
app.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	console.log("In Route provider of Driver");
      $routeProvider
          .when('/profile',{
              templateUrl: '/UberDriverProfile.ejs', controller: 'driverProfileController'
          })
          .when('/summary',{
                templateUrl: '/UberDriverSummary.ejs', controller: 'driverSummaryController'
          })
          .when('/invoice',{
                templateUrl: '/UberMyTrips.ejs', controller: 'myTrips'
          })
});

app.controller("driverProfileController", driverProfileController);
driverProfileController.$inject = [ '$scope', '$http', '$window'];
function driverProfileController($scope, $http, $window) {
	//TODO Ankita fetch this value from session
	
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			alert("SSN obtained");
			$scope.ssn=response.driver.ssn;
			$scope.firstname= response.driver.firstname;
			$scope.lastname= response.driver.lastname;
			$scope.mobileno= response.driver.mobileno;
			$scope.email= response.driver.email;
		} else {
			alert("error1");
		}			
	}).error(function(error) {
		console.log(error);
	});
	
	console.log("DriverProfile 1");
	$scope.update = function() {
		console.log("Update Driver Profile");
		$http({
			method : 'POST',
			url : '/bk_driver_update',
			data : {
				"ssn" : $scope.ssn,
				"email" : $scope.email,
				"password": $scope.password,
				"firstname": $scope.firstname,
				"lastname": $scope.lastname,
				"mobileno" : $scope.mobileno
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success");
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
	
//	// loading customer data from backend for when html loads
		$http({
			method : 'POST',
			url : '/bk_driver_search_with_ssn',
			data : {
				"ssn" : $scope.ssn,
			}
		}).success(function(response) {
			if (response.result != "error") {
				$scope.driverProfile=response.value;
				alert("Success");
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log("call success");
			console.log(error);
		});
	
}

app.controller("myTrips", myTrips);
myTrips.$inject = [ '$scope', '$http', '$window'];
function myTrips($scope, $http, $window) {
	
	
	$scope.data = [];
	 $scope.currentPage = 0;
	 $scope.pageSize = 2;
	 $scope.data = [];
	 $scope.q = '';
	 
//	Logic for Pagination
	 
//	 $scope.getData = function () {
//	        var arr = [];
//	        if($scope.q == '') {
//	            arr = $scope.bills;
//	        } else {
//	            for(var ea in $scope.bills) {
//	                if($scope.bills[ea].indexOf($scope.q) > -1) {
//	                    arr.push( $scope.bills[ea] );
//	                }
//	            }
//	        }
//	        return arr;
//	       
//	    };
//	    
//	    $scope.numberOfPages=function(){
//	        return Math.ceil($scope.getData().length/$scope.pageSize);                
//	    };
//	    
//	    for (var i=0; i<200000; i++) {
//	        $scope.data.push("Item "+i);
//	    }
	 
	$scope.getDriverSummary = function() {
		$http({
			method : "POST",
			url : '/getDriverSummary',
			data : {
				"DriverId" : "1"
			}
		}).success(function(response) {
			console.log("data recieved : " + response.value[0]);
		    $scope.data = response.value;
			
		}).error(function(error) {
			
		});
	};

	
}