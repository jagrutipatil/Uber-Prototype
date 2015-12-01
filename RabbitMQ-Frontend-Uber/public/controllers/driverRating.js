var app=angular.module('Ratings',[]);

app.controller('rating',function($scope,$http){
	$scope.rate = function() {
		console.log("Submit Rating");
		console.log($scope.star);
		console.log($scope.feedback);
		$http({
			method : 'POST',
			url : '/bk_driver_rating',
			data : {
				"rating" : $scope.star,
				"feedback": $scope.feedback
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
});
