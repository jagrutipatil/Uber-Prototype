var app = angular.module('signupDriver', []);
app.controller("signupDriverController", signupDriverController);
signupDriverController.$inject = [ '$scope', '$http', '$window'];
function signupDriverController($scope, $http, $window) {
		 
	function randomGeo(center, radius) {
	    var y0 = center.latitude;
	    var x0 = center.longitude;
	    var rd = radius / 111300;  //TODO need to verify this number its generting drivers very near

	    var u = Math.random();
	    var v = Math.random();

	    var w = rd * Math.sqrt(u);
	    var t = 2 * Math.PI * v;
	    var x = w * Math.cos(t);
	    var y = w * Math.sin(t);

	    var xp = x / Math.cos(y0);

	    return {
	        'latitude': y + y0,
	        'longitude': x + x0
	    };
	}

	
	$scope.signup = function() {
		
		var mapcenter = {'latitude' : 37.3444869629532, 'longitude': -121.883543986265}; 
		var latlong = randomGeo(mapcenter, 16093.4);

		$http({
			method : 'POST',
			url  : '/bk_driver_signup',
			data : {
				"ssn" : $scope.ssn,
				"email" : $scope.email,
				"password": $scope.password,
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"mobileno" : $scope.mobileno,
				"address":   $scope.address,
				"city":      $scope.city,
				"state":     $scope.state,
				"dlno":      $scope.dlno,
				"postalcode" : $scope.postalcode,
				"latitude" : latlong.latitude,
				"longitude" : latlong.longitude,
				"url" : "https://www.youtube.com/watch?v=gXTBd87LUH8" 
			}
		}).success(function(response) {
			if (response.result != "error") {
				$window.location.assign('/loginDriver');
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
}