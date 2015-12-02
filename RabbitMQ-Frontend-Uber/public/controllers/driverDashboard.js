var app=angular.module('SinglePageDriver',['ngRoute']);
app.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
      $routeProvider
          .when('/driverDashboard',{
        	  templateUrl: '/UberDriverSummary.ejs', controller: 'driverSummaryController'
    	  })
          .when('/profile',{
              templateUrl: '/UberDriverProfile.ejs', controller: 'driverProfileController'
          })
          .when('/rides',{
              templateUrl: '/DriverRides.ejs', controller: 'RidesController'
          })
          .when('/summary',{
                templateUrl: '/UberDriverSummary.ejs', controller: 'driverSummaryController'
          })
          .when('/invoice',{
                templateUrl: '/UberMyTrips.ejs', controller: 'myTrips'
          })
});


app.controller("RidesController", RidesController);
RidesController.$inject = [ '$scope', '$http', '$window'];
function RidesController($scope, $http, $window) {	
}

app.controller("driverSummaryController", driverSummaryController);
driverSummaryController.$inject = [ '$scope', '$http', '$window'];
function driverSummaryController($scope, $http, $window) {	
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn1=response.driver.ssn;
			console.log("session received in controller");
			console.log($scope.ssn1);
			if (response.result != "error") {
				$http({
					method : 'POST',
					url : '/bk_driver_search_with_ssn',
					data : {
						"ssn" : $scope.ssn1,
					}
				}).success(function(response) {
					if (response.result != "error") {
						$scope.driverprofile=response.value;
						console.log("Success bk_driver_search_with_ssn");
					} else {
						console.log("error bk_driver_search_with_ssn");
					}			
				}).error(function(error) {
					console.log("call success");
					console.log(error);
				});
			} else {
				console.log(error);
			}
		}					
	}).error(function(error) {
		console.log(error);
	});
}



app.controller("driverProfileController", driverProfileController);
driverProfileController.$inject = [ '$scope', '$http', '$window'];
function driverProfileController($scope, $http, $window) {	
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn=response.driver.ssn;
			console.log("session received in controller");
			console.log($scope.ssn);
			$http({
				method : 'POST',
				url : '/bk_driver_search_with_ssn',
				data : {
					"ssn" : $scope.ssn,
				}
			}).success(function(response) {
				if (response.result != "error") {
					$scope.ssn=response.value.ssn;
					$scope.firstname= response.value.firstname;
					$scope.lastname= response.value.lastname;
					$scope.mobileno= response.value.mobileno;
					$scope.email= response.value.email;
					console.log("Success bk_driver_search_with_ssn");
				} else {
					console.log("error bk_driver_search_with_ssn");
				}			
			}).error(function(error) {
				console.log("call success");
				console.log(error);
			});
		} else {
			console.log(error);
		}			
	}).error(function(error) {
		console.log(error);
	});

	
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
				console.log("updated sucessfully");
			} else {
				console.log("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};	
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
	 
//	 $scope.getDriverSummary = function() {
//	 $http({
//			method : 'POST',
//			url : '/session_get_ssn',
//			data : {}
//		}).success(function(response) {
//			if (response.result != "error") {
//				alert("SSN obtained");
//				var ssn = response.driver.ssn;
//				console.log(ssn);
//				console.log("Reached SSN");
//				$http({
//					method : "POST",
//					url : '/getDriverSummary',
//					data : {
//						"DriverId" : ssn
//					}
//				}).success(function(response) {
//					console.log("data recieved : " + response.value[0]);
//				    $scope.data = response.value;
//					
//				}).error(function(error) {
//					
//				});
//			} else {
//				alert("error1");
//			}			
//		}).error(function(error) {
//			console.log(error);
//		});
//		};
	 
//	 $scope.getDriverSummary = function() {
//			$http({
//				method : "POST",
//				url : '/getDriverSummary',
//				data : {
//					"DriverId" : ssn
//				}
//			}).success(function(response) {
//				console.log("data recieved : " + response.value[0]);
//			    $scope.data = response.value;
//				
//			}).error(function(error) {
//				
//			});
//		};

	
}