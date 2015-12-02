var app = angular.module('signupDriver', []);
app.controller("signupDriverController", signupDriverController);
signupDriverController.$inject = [ '$scope', '$http', '$window' ];
function signupDriverController($scope, $http, $window) {

	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
	function validateSSN(ssn) { 		  
	    var re = /^\d{3}-\d{2}-\d{4}$/;
	    return re.test(ssn);
	}		
	
	function validatePostalCode(postalCode) {
	    var re = /^\d{5}$/;
	    return re.test(postalCode);
	}
	
	$scope.signup = function() {
		if (validateSSN($scope.ssn) && validateEmail($scope.email) && validatePostalCode($scope.postalcode)) {
				var lat;
				var lng;
				var postalcode = $scope.postalcode;
				var getJSON = function(url) {
					return new Promise(function(resolve, reject) {
						var xhr = new XMLHttpRequest();
						xhr.open('get', url, true);
						xhr.responseType = 'json';
						xhr.onload = function() {
							var status = xhr.status;
							if (status == 200) {
								resolve(xhr.response);
							} else {
								reject(status);
							}
						};
						xhr.send();
					});
				};

				getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=postalcode').then(function(data) {
					//console.log(data.results[0].geometry.location.lat);
					lat = data.results[0].geometry.location.lat;
					lng = data.results[0].geometry.location.lng;
					lat = lat.toFixed(3);
					lng = lng.toFixed(3);

					$http({
						method : 'POST',
						url : '/bk_driver_signup',
						data : {
							"ssn" : $scope.ssn,
							"email" : $scope.email,
							"password" : $scope.password,
							"firstname" : $scope.firstname,
							"lastname" : $scope.lastname,
							"mobileno" : $scope.mobileno,
							"address" : $scope.address,
							"city" : $scope.city,
							"state" : $scope.state,
							"dlno" : $scope.dlno,
							"postalcode" : $scope.postalcode,
							"latitude" : lat,
							"longitude" : lng,
							"url" : "https://www.youtube.com/watch?v=gXTBd87LUH8"
						}
					}).success(function(response) {
						if (response.result != "error") {
							alert("Success");
							$window.location.assign('/loginDriver');

						} else {
							alert("error");
						}
					}).error(function(error) {
						console.log(error);
					});
				}, function(status) { //error detection....
					alert('Something went wrong.');
				});
			
		} else {
			if(!validateSSN($scope.ssn)) {
				alert("Error: SSN not valid");
			} else if (!validateEmail($scope.email)) {
				alert("Error: Email address not valid");
			} else if (!validatePostalCode($scope.postalcode)) {
				alert("Error: Postal code should be 5 digit");
			} 
		}
	};
}