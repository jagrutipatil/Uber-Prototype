var app = angular.module('loginCustomer', []);
app.controller("loginCustomerController", loginCustomerController);
loginCustomerController.$inject = [ '$scope', '$http', '$window'];
function loginCustomerController($scope, $http, $window) {
	$scope.signin = function() {
		$http({
			method : 'POST',
			url : '/bk_customer_signin',
			data : {
				"email" : $scope.email,
				"password": $scope.password
			}
		}).success(function(response) {
			if (response.result != "error") {
				$window.location.assign('/customerDashboard');
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
}