var app = angular.module('signupCustomer', []);
app.controller("signupCustomerController", signupCustomerController);
signupCustomerController.$inject = [ '$scope', '$http', '$window'];
function signupCustomerController($scope, $http, $window) {
			
	$scope.signup = function() {
		$http({
			method : 'POST',
			url : '/bk_customer_signup',
			data : {
				"email" : $scope.email,
				"password": $scope.password,
				"firstname" : $scope.firstname,
				"lastname" : $scope.lastname,
				"mobileno" : $scope.mobileno,
				"cardno" : $scope.cardno,
				"cvv" : $scope.cvv,
				"exp_month" : $scope.exp_month,
				"exp_year" : $scope.exp_year,
				"postalcode" : $scope.postalcode
			}
		}).success(function(response) {
			if (response.result != "error") {
			} else {
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
}