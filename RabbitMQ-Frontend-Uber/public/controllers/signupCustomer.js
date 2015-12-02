var app = angular.module('signupCustomer', []);
app.controller("signupCustomerController", signupCustomerController);
signupCustomerController.$inject = [ '$scope', '$http', '$window'];
function signupCustomerController($scope, $http, $window) {

	$scope.signup = function() {
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

			$scope.signup = function() {
				$http({
					method : 'POST',
					url : '/bk_customer_signup',
					data : {
						"ssn" : $scope.ssn,
						"email" : $scope.email,
						"password": $scope.password,
						"firstname" : $scope.firstname,
						"lastname" : $scope.lastname,
						"mobileno" : $scope.mobileno,
						"cardno" : $scope.cardno,
						"cvv" : $scope.cvv,
						"exp_month" : $scope.exp_month,
						"exp_year" : $scope.exp_year,
						"postalcode" : $scope.postalcode,
						"latitude" : lat,
						"longitude" : lng
					}
				}).success(function(response) {
					if (response.result != "error") {
						$window.location.assign('/loginCustomer');
					} else {
					}			
				}).error(function(error) {
					console.log(error);
				});
			};
		}, function(status) { //error detection....
			alert('Something went wrong.');
		});
	};
}