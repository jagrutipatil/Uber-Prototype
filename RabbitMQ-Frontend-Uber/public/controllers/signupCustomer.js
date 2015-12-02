var app = angular.module('signupCustomer', []);
app.controller("signupCustomerController", signupCustomerController);
signupCustomerController.$inject = [ '$scope', '$http', '$window'];
function signupCustomerController($scope, $http, $window) {
	
	function validateEmail(email) { 
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test(email);
	}
	
	function validateSSN(ssn) { 		  
	    var re = /^\d{3}-\d{2}-\d{4}$/;
	    return re.test(ssn);
	}		
	
	function validatePostalCode(postalCode) {
	    var re = /^\d{5}$/;
	    return re.test(postalCode);
	}
	
	function validateMobileNo(mobileno) {
	    var re = /^\d{10}$/;
	    return re.test(mobileno);
	}

	function validateCardNo(cardno) {
	    var re = /^\d{16}$/;
	    return re.test(cardno);
	}
	
	function validateCvv(cvv) {
	    var re = /^\d{3}$/;
	    return re.test(cvv);
	}
	
	$scope.signup = function() {
		if (validateSSN($scope.ssn) && validateEmail($scope.email) && validatePostalCode($scope.postalcode) 
				&& validateCardNo($scope.cardno) && validateCvv($scope.cvv) && validateMobileNo($scope.mobileno)) {

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
							alert("Error: Customer SSN, Email, Mobile no already exists. Please provide unique SSN, mobile no and email");
						}			
					}).error(function(error) {
						console.log(error);
					});
				};
			}, function(status) { //error detection....
				alert('Something went wrong.');
			});
		} else {
			if(!validateSSN($scope.ssn)) {
				alert("Error: SSN not valid");
			} else if (!validateEmail($scope.email)) {
				alert("Error: Email address not valid");
			} else if (!validatePostalCode($scope.postalcode)) {
				alert("Error: Postal code should be 5 digit");
			} else if (!validateCardNo($scope.cardno)) {
				alert("Error: Card No should be 16 digit");
			}else if (!validateCvv($scope.cvv)) {
				alert("Error: CVV should be 3 digit");
			} else if (!validateMobileNo($scope.mobileno)) {
				alert("Error: Mobile No should be 10 digit");
			}
		}
	};
}