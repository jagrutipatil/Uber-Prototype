var app = angular.module('account', []);

app.controller("accountController", fbController);

fbController.$inject = [ '$scope', '$http', '$window' ];

function fbController($scope, $http, $window) {
	var gender;
	$scope.login = function() {				
		$http({
			method : 'POST',
			url : '/signup',
			data : {
				"firstname" : $scope.firstname,
				"lastname" :  $scope.lastname,
				"email":      $scope.email,
				"mobile" :    $scope.mobile,
				"password":   $scope.password
  			}
		}).success(function(response) {
			if (response.result != "error") {} else {
				alert("User with same email id already exists");
				$scope.susername = "";
				$scope.spassword = "";
				$scope.firstname = "";
				$scope.lastname = "";
			}
			
		}).error(function(error) {
			console.log(error);
		});
	};
}