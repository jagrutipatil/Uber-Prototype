var app=angular.module('Ratings',[]);

app.controller('rating',function($scope,$http){
	$scope.rate = function() {
		console.log("Submit Rating");
		console.log($scope.star);
		console.log($scope.feedback);
		
		$http({
			method : 'POST',
			url : '/session_get_ssn',
			data : {}
		}).success(function(response) {
			if (response.result != "error") {
				console.log("SSN obtained for rides");
				var ssn = response.ssn;
				
				$http({
					method : 'POST',
					url : '/d_ratings',
					data : {
						"rating" : $scope.star,
						"feedback": $scope.feedback,
						"cust_id": ssn
					}
				}).success(function(response) {
					if (response.result != "error") {
						alert("Success");
						 window.close();
					} else {
						alert("error");
					}			
				}).error(function(error) {
					console.log(error);
				});
				
			} else {
				alert("error");
			}
		}).error(function(error) {
			console.log(error);
		});
		
		
	};
});
