var app=angular.module('SinglePage',['ngRoute']);
app.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
      $routeProvider
      	  .when('/customerDashboard',{
      		templateUrl: '/viewProfileCustomer.ejs', controller: 'viewProfileController'
      	  })
      	  .when('/viewProfile',{
      		  templateUrl: '/viewProfileCustomer.ejs', controller: 'viewProfileController'
      	  })
          .when('/profile',{
              templateUrl: '/UberProfile.ejs', controller: 'customerProfileController'
          })
          .when('/payment',{
                templateUrl: '/UberPayment.ejs', controller: 'customerPaymentController'
          })
          .when('/mytrips',{
                templateUrl: '/UberMyTrips.ejs', controller: 'myTrips'
          })
          .when('/addImages',{
                templateUrl: '/addImagesToRide.ejs', controller: 'addImages'
          })
          .when('/rideImages',{
                templateUrl: '/RideImages.ejs', controller: 'rideImages'
          })
		  .when("/requestride",{
		      templateUrl: "/ride.ejs", controller: 'rideController'
		  });
});

app.controller('rideImages', function($scope) {
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			console.log("SSN obtained for rides");
			$scope.ssn5 = response.ssn;			
		} else {
			console.log("Error in obtained for rides");
		}
	}).error(function(error) {
		console.log(error);
	});

	$scope.model = {
		message : "This is sum"
	}
	$scope.requestRide = function() {
		window.location.href = '/RequestRide';
	}
	$scope.estimateRide = function() {
		window.location.href = '/RequestRide';
	}
});

app.controller('addImages', function($scope) {	
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			console.log("SSN obtained for rides");
			$scope.ssn5 = response.ssn;			
		} else {
			alert("error");
		}
	}).error(function(error) {
		console.log(error);
	});
});


app.controller('rideController', function($scope) {
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			console.log("SSN obtained for rides");
			$scope.ssn1 = response.ssn;
		} else {
			alert("error");
		}
	}).error(function(error) {
		console.log(error);
	});

	$scope.model = {
		message : "This is sum"
	}
	$scope.requestRide = function() {
		window.location.href = '/RequestRide';
	}
	$scope.estimateRide = function() {
		window.location.href = '/RequestRide';
	}
});

app.controller("viewProfileController", viewProfileController);
viewProfileController.$inject = [ '$scope', '$http', '$window' ];
function viewProfileController($scope, $http, $window) {
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn2 = response.ssn;
			$http({
				method : 'POST',
				url : '/bk_customer_search_with_ssn',
				data : {
					"ssn" : $scope.ssn2,
				}
			}).success(function(response) {
				if (response.result != "error") {
					$scope.customerProfile = response.value;
				} else {
					alert("error");
				}
			}).error(function(error) {
				console.log("call success");
				console.log(error);
			});
		} else {
			alert("error");
		}
	}).error(function(error) {
		console.log(error);
	});
}

app.controller("customerProfileController", customerProfileController);
customerProfileController.$inject = [ '$scope', '$http', '$window' ];
function customerProfileController($scope, $http, $window) {
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn2 = response.ssn;
			$http({
				method : 'POST',
				url : '/bk_customer_search_with_ssn',
				data : {
					"ssn" : $scope.ssn2,
				}
			}).success(function(response) {
				if (response.result != "error") {
					$scope.customerProfile = response.value;
				} else {
					alert("error");
				}
			}).error(function(error) {
				console.log("call success");
				console.log(error);
			});
		} else {
			alert("error");
		}
	}).error(function(error) {
		console.log(error);
	});

	// loading customer data from backend for when html loads
	console.log("CustomerProfile 1");
	$scope.update = function() {
		console.log("Update Profile");
		$http({
			method : 'POST',
			url : '/bk_customer_update',
			data : {
				"ssn" : $scope.ssn2,
				"email" : $scope.email,
				"password" : $scope.password,
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"mobileno" : $scope.mobileno
			}
		}).success(function(response) {
			if (response.result != "error") {
			} else {
				alert("error");
			}
		}).error(function(error) {
			console.log(error);
		});
	};
}

app.controller("customerPaymentController", customerPaymentController);
customerPaymentController.$inject = [ '$scope', '$http', '$window'];
function customerPaymentController($scope, $http, $window) {
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn3=response.ssn;			
		} else {
			console.log("Payment controller");
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	
	$scope.updatePayment = function() {
		console.log("UpdtePayment.js");
		$http({
			method : 'POST',
			url : '/bk_customer_updatePayment',
			data : {
				"ssn" : $scope.ssn3,
				"cardno" : $scope.cardno,
				"cvv": $scope.cvv,
				"exp_month": $scope.exp_month,
				"exp_year": $scope.exp_year
			}
		}).success(function(response) {
			if (response.result != "error") {
				console.log("in update payment");
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
}

app.controller('sendData', function($scope,$http) {	
    console.log("Code is here");
    $scope.submit = function(){
    	console.log("################################################################");
    	function generateUniqueId(){
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
    	}
    	var ssn = generateUniqueId;
    	console.log(ssn);
    	$http({
			method : 'POST',
			url : '/bk_rides_register',
			data : {
				"ride_id" : "000000",
				"cust_id" : "111111",
				"driver_id": "222222",
				"origin" : $(".orig").val(),
				"dest" : $(".dest").val(),
				"date" : "29112015",
				"distance" : parseInt(dist.value),
				"duration" : parseInt(dur.value),
				"flag" : "0"
			}
		}).success(function(response) {
			if (response.result != "error") {
				console.log("success from send data controller");
			} else {
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
	
	$scope.submit2 = function(){
		var orig = $(".orig").val();
    	console.log("List of Drivers");
    	console.log(orig);
	};
});


app.controller("myTrips", myTrips);
myTrips.$inject = [ '$scope', '$http', '$window'];
function myTrips($scope, $http, $window) {$scope.bills = [];
$scope.currentPage = 0;
$scope.pageSize = 2;
$scope.data = [];
$scope.q = '';

$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn6=response.ssn;			
		} else {
			console.log("Payment controller");
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});

$scope.getData = function () {
       var arr = [];
       if($scope.q == '') {
           arr = $scope.bills;
       } else {
           for(var ea in $scope.bills) {
               if($scope.bills[ea].indexOf($scope.q) > -1) {
                   arr.push( $scope.bills[ea] );
               }
           }
       }
       return arr;
      
   };
   
   $scope.numberOfPages=function(){
       return Math.ceil($scope.getData().length/$scope.pageSize);                
   };
   
   for (var i=0; i<200000; i++) {
       $scope.data.push("Item "+i);
   }

$scope.getUserBills = function() {
	console.log("recieved" );
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			$scope.ssn6=response.ssn;	
			
			$http({
				method : "POST",
				url : '/getUserBills',
				data : {
					"customerId" :response.ssn
				}
			}).success(function(data1) {
				console.log("data recieved : " + data1.value[0]);
			    $scope.bills = data1.value;
				
			}).error(function(error) {			
			});
		} else {
			console.log("Payment controller");
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	
	/*$http({
		method : "POST",
		url : '/getUserBills',
		data : {
			"customerId" : $scope.ssn6
		}
	}).success(function(data) {
		console.log("data recieved : " + data.value[0]);
	    $scope.bills = data.value;
		
	}).error(function(error) {			
	});*/
};
}