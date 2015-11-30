var app=angular.module('SinglePage',['ngRoute']);
app.config(function($routeProvider, $locationProvider){
	$locationProvider.html5Mode(true);
	console.log("Code is here");
      $routeProvider
          .when('/profile',{
              templateUrl: '/UberProfile.ejs', controller: 'customerProfileController'
          })
          .when('/payment',{
                templateUrl: '/UberPayment.ejs', controller: 'customerPaymentController'
          })
		  .when("/requestride",{
		      templateUrl: "/ride.ejs", controller: 'rideController'
		  });
});

app.controller('rideController',function($scope){
		$scope.model = {
				message: "This is sum"
		}
		$scope.requestRide = function() {
			window.location.href = '/RequestRide';
		}
		$scope.estimateRide = function() {
			window.location.href = '/RequestRide';
		}
});

app.controller("customerProfileController", customerProfileController);
customerProfileController.$inject = [ '$scope', '$http', '$window'];
function customerProfileController($scope, $http, $window) {
	//TODO Ankita fetch this value from session
	
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			alert("SSN obtained");
			$scope.ssn1=response.ssn;
		} else {
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	
	console.log("CustomerProfile 1");
	$scope.update = function() {
		console.log("Update Profile");
		$http({
			method : 'POST',
			url : '/bk_customer_update',
			data : {
				"ssn" : $scope.ssn1,
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
}

app.controller("customerPaymentController", customerPaymentController);
customerPaymentController.$inject = [ '$scope', '$http', '$window'];
function customerPaymentController($scope, $http, $window) {
	//TODO Ankita fetch this value from session
	
	
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			alert("SSN obtained");
			$scope.ssn=response.ssn;
		} else {
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	
	console.log("UpdatePaymentd");
	
	$scope.updatePayment = function() {
		console.log("UpdtePayment.js");
		$http({
			method : 'POST',
			url : '/bk_customer_updatePayment',
			data : {
				"ssn" : $scope.ssn,
				"cardno" : $scope.cardno,
				"cvv": $scope.cvv,
				"exp_month": $scope.exp_month,
				"exp_year": $scope.exp_year
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
				"flag" : "0",
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success");
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
