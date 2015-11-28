var app = angular.module('customerPayment', []);
app.controller("customerPaymentController", customerProfileController);
customerProfileController.$inject = [ '$scope', '$http', '$window'];
function customerProfileController($scope, $http, $window) {
	//TODO Ankita fetch this value from session
	var ssn = "AAA-GG-AAAA";
	
	$scope.updatePayment = function() {
		$http({
			method : 'POST',
			url : '/bk_customer_updatePayment',
			data : {
				"ssn" : ssn,
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