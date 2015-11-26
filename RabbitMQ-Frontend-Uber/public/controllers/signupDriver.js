var app = angular.module('signupDriver', []);
app.controller("signupDriverController", signupDriverController);
signupDriverController.$inject = [ '$scope', '$http', '$window'];
function signupDriverController($scope, $http, $window) {
			
	$scope.signup = function() {
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
				"postalcode" : $scope.postalcode
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