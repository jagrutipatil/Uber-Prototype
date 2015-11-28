var app = angular.module('customerProfile', []);
app.controller("customerProfileController", customerProfileController);
customerProfileController.$inject = [ '$scope', '$http', '$window'];
function customerProfileController($scope, $http, $window) {
	//TODO Ankita fetch this value from session
	var ssn = "AAA-GG-AAAA";
	
	$scope.update = function() {
		$http({
			method : 'POST',
			url : '/bk_customer_update',
			data : {
				"ssn" : ssn,
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