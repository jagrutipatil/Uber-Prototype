var app = angular.module('administrator', []);
app.controller("adminController", adminController);
adminController.$inject = [ '$scope', '$http', '$window'];
function adminController($scope, $http, $window) {
	
	/*call API for unapproved customers*/
	$http({
		method : 'POST',
		url : '/bk_customer_selectAllUnApproved',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.customers = [];
			$scope.count = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempCust = {};
				$scope.count = parseInt($scope.count) + 1;
				tempCust.number = $scope.count; 
				tempCust.firstname = value.firstname;
				tempCust.lastname = value.lastname;
				tempCust.ssn = value.ssn;
				$scope.customers.push(tempCust);
				
			})
			alert("Success");
		} else {
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	/*End API Call for unapproved customers*/
	
	/* Call API for unapproved drivers */
	$http({
		method : 'POST',
		url : '/bk_driver_selectAllUnApproved',
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		data : {
		}
	}).success(function(response) {
		if (response.result != "error") {
			console.log(response.value);
			$scope.drivers = [];
			$scope.countDriver = 0;
			angular.forEach(response.value,function(value, key){
				console.log(value);
				var tempDriver = {};
				$scope.countDriver = parseInt($scope.countDriver) + 1;
				tempDriver.number = $scope.countDriver; 
				tempDriver.firstname = value.firstname;
				tempDriver.lastname = value.lastname;
				tempDriver.ssn = value.ssn;
				$scope.drivers.push(tempDriver);
				
			})
			alert("Success");
		} else {
			alert("error");
		}			
	}).error(function(error) {
		console.log(error);
	});
	/*End API Call for unapproved drivers*/
	
	/* API call for approving a customer */
	$scope.update = function(ssnNumber) {
		console.log('here');
		$http({
			method : 'POST',
			url : '/bk_customer_approve',
			data : {
				"ssn" : ssnNumber
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success");
				$window.location.reload();
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
	/*End API call for approving a customer*/
	
	/* API call for approving a driver */
	$scope.update = function(ssnNumber) {
		console.log('here');
		$http({
			method : 'POST',
			url : '/bk_driver_approve',
			data : {
				"ssn" : ssnNumber
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success");
				$window.location.reload();
			} else {
				alert("error");
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
	/*End API call for approving a driver*/
}