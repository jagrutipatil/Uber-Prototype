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
    	var ssn = generateUniqueId;
    	console.log(ssn);
    	$http({
			method : 'POST',
			url : '/bk_rides_register',
			data : {
				"ride_id" : "000000",
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
				alert("Success");
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
});

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