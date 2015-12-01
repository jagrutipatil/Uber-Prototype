var app = angular.module('maps');

app.controller('sendData', function($scope,$http) {
	
    console.log("Code is here");
    $scope.submit = function(){
    	console.log("################################################################");
    	function generateUniqueId(){
   		 function s4() {
   			   return Math.floor((1 + Math.random()) * 0x1000);
   			 }
   			 function s3() {
   			   return Math.floor((1 + Math.random()) * 0x100);
   			 }
   			function s2() {
   			   return Math.floor((1 + Math.random()) * 0x10);
   			 }
   			 return s3() + '-' + s2() + '-' + s4();
    	}
    	var ride_id = generateUniqueId();
    	$http({
			method : 'POST',
			url : '/bk_rides_register',
			data : {
				"ride_id" : ride_id,
				"cust_id" : "111111",
				"driver_id": "222222",
				"origin" : $(".orig").val(),
				"dest" : $(".dest").val(),
				"date" : "29112015",
				"distance" : parseInt(dist.value),
				"duration" : parseInt(dur.value),
				"flag" : "0",
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success Ride");
			} else {
			}			
		}).error(function(error) {
			console.log(error);
		});
    	
    	$http({
			method : 'POST',
			url : '/billGenerate',
			data : {
				"ride_id" : ride_id,
				"customerId" : "111111",
				"driverId": "222222",
				"source" : $(".orig").val(),
				"destination" : $(".dest").val(),
				"date" : "29112015",
				"distance" : parseInt(dist.value),
				"duration" : parseInt(dur.value),
				"distance" : parseInt(dist.value),
				"totalTime" : parseInt(dur.value),
				"startTime" : "11",
				"endTime" : "12",
				"flag" : "0",
				"carType" : "uberx"
			}
		}).success(function(response) {
			if (response.result != "error") {
				alert("Success Bill " + response.value);
			} else {
			}			
		}).error(function(error) {
			console.log(error);
		});
    	
	};
	
	$scope.submit2 = function(){
		var orig = $(".orig").val();
    	console.log("List of Drivers");
    	console.log(orig);
	};
	
	$scope.estimate = function(){
		console.log("distance : " + dist.value)
		$http({
			method : 'POST',
			url : '/estimate',
			data : {
				"distance" : parseInt(dist.value),
				"totalTime" : parseInt(dur.value),
				"startTime" : "11",
				"endTime" : "12",
				"carType" : "uberx"
			}
		}).success(function(response) {
			if (response.result != "error") {
				console.log(response);
				alert("Estimate Fare is : " + response.value);
			} else {
			}			
		}).error(function(error) {
			console.log(error);
		});
	};
});

app.controller('LevelCtrl', function($scope,$http) {
	var result;
  $http({
		method : 'POST',
		url : '/bk_driver_selectAllAvailable',
		data : { },
		}).success(function(response){
			console.log("code is here");
		console.log(response.value);
		$scope.srv = {};
		  console.log("The response frm UI");
		  console.log(result);
		  $scope.data = {};
		  $scope.data.getLevels = function() {
		    return response.value;
		  }
		}).error(function(error){
		console.log(error);
		})
  
})


/*$http({
method : 'POST',
url : '/billGenerate',
data : { 'distance':parseInt(dist.value),
		'totalTime':parseInt(dur.value),
		'startTime':3,
		'endTime':6,
		'carType':"uberx"},
}).success(function(response){
$window.location.assign('/afterSignIn');
}).error(function(error){
console.log(error);
});*/