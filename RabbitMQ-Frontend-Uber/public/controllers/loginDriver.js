var app = angular.module('loginDriver', []);
app.controller("loginDriverController", loginDriverController);
loginDriverController.$inject = [ '$scope', '$http', '$window'];
function loginDriverController($scope, $http, $window) {
	$scope.signin = function() {
		$http({
			method : 'POST',
			url : '/bk_driver_signin',
			data : {
				"email" : $scope.email,
				"password": $scope.password
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success");
			$window.location.assign('/driverDashboard');
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
}