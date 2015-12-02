
var app = angular.module('maps');
var driverSsn;
$(document).ready(function(){
    $("#driver_ssn").change(function() {
    	driverSsn = $('#driver_ssn option:selected').text();
    	alert("You have Selected  :: "+driverSsn);
  });  
});
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
            url : '/session_get_ssn',
            data : {}
        }).success(function(response) {
            if (response.result != "error") {
                console.log("SSN obtained for rides");
                ssn = response.ssn;       
               
                $http({
                    method : 'POST',
                    url : '/bk_rides_register',
                    data : {
                        "ride_id" : ride_id,
                        "cust_id" : ssn,
                        "driver_id": driverSsn,
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
                        "customerId" : ssn,
                        "driverId": driverSsn,
                        "source" : $(".orig").val(),
                        "destination" : $(".dest").val(),
                        "date" : "29112015",
                        "distance" : parseInt(dist.value),
                        "duration" : parseInt(dur.value),
                        "distance" : parseInt(dist.value),
                        "totalTime" : parseInt(dur.value),
                        "startTime" : "5",
                        "endTime" : "6",
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
               
            } else {
                alert("error");
            }
        }).error(function(error) {
            console.log(error);
        });
       
       
        var socket = io.connect('http://localhost:3000');
        //Socket function starts here
       
       
            var data = {};
            data.ssn = driverSsn;
            data.request = 'Start Ride';
            socket.emit('Server', data);
            console.log(data);
           
     
          socket.on('Customer', function (data) {
            console.log(data);
            if(data.ssn.toString() === driverSsn && data.request.toString() === 'Ride Accepted'){
                $("#reqBtn").addClass("hidden");       
                $("#dialog-message").removeClass("hidden");
                $(function() {
                        $( "#dialog-message" ).dialog({
                          modal: true,
                          buttons: {
                            Ok: function() {
                              $( this ).dialog( "close" );
                              $("#startRideDiv").removeClass("hidden");
                            }
                          }
                        });
                });
            }
           
            if(data.ssn.toString() === driverSsn && data.request.toString() === 'Ride Ended'){
                $("#reqBtn").addClass("hidden");       
                $("#dialog-message").addClass("hidden");
                $("#dialog-message2").removeClass("hidden");
                $("#startRideDiv").addClass("hidden");
                $(function() {
                        $( "#dialog-message2" ).dialog({
                          modal: true,
                          buttons: {
                            Ok: function() {
                                window.open('/driverRating');
                              $( this ).dialog( "close" );
                             
                              $("#startNewRideDiv").removeClass("hidden");
                            }
                          }
                        });
                });
            }
      });
       
    };
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
    		url : '/session_get_ssn',
    		data : {}
    	}).success(function(response) {
    		if (response.result != "error") {
    			console.log("SSN obtained for rides");
    			ssn = response.ssn;		
    			
    			$http({
    				method : 'POST',
    				url : '/bk_rides_register',
    				data : {
    					"ride_id" : ride_id,
    					"cust_id" : ssn,
    					"driver_id": driverSsn,
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
    					"customerId" : ssn,
    					"driverId": driverSsn,
    					"source" : $(".orig").val(),
    					"destination" : $(".dest").val(),
    					"date" : "29112015",
    					"distance" : parseInt(dist.value),
    					"duration" : parseInt(dur.value),
    					"distance" : parseInt(dist.value),
    					"totalTime" : parseInt(dur.value),
    					"startTime" : "5",
    					"endTime" : "6",
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
    			
    		} else {
    			alert("error");
    		}
    	}).error(function(error) {
    		console.log(error);
    	});
    	
    	
    	var socket = io.connect('http://localhost:3000');
    	//Socket function starts here
    	
    	
			var data = {};
			data.ssn = driverSsn;
			data.request = 'Start Ride';
			socket.emit('Server', data);
			console.log(data);
			
	  
	  	socket.on('Customer', function (data) {
			console.log(data);
			if(data.ssn.toString() === driverSsn && data.request.toString() === 'Ride Accepted'){
				$("#reqBtn").addClass("hidden");	    
				$("#dialog-message").removeClass("hidden");
		    	$(function() {
					    $( "#dialog-message" ).dialog({
					      modal: true,
					      buttons: {
					        Ok: function() {
					          $( this ).dialog( "close" );
					          $("#startRideDiv").removeClass("hidden");
					        }
					      }
					    });
				});
			}
			
			if(data.ssn.toString() === driverSsn && data.request.toString() === 'Ride Ended'){
				$("#reqBtn").addClass("hidden");	    
				$("#dialog-message").addClass("hidden");
				$("#dialog-message2").removeClass("hidden");
				$("#startRideDiv").addClass("hidden");
		    	$(function() {
					    $( "#dialog-message2" ).dialog({
					      modal: true,
					      buttons: {
					        Ok: function() {
					        	window.open('/driverRating');
					          $( this ).dialog( "close" );
					          
					          $("#startNewRideDiv").removeClass("hidden");
					        }
					      }
					    });
				});
			}
	  });
    	
	};
>>>>>>> a9f7e77fb2e784fc75430f9e8bb8dd05ac7e4820
	
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
<<<<<<< HEAD
    var result;
    var ssn5;
    var lat;
    var lng;
    $http({
        method : 'POST',
        url : '/session_get_ssn',
        data : {}
    }).success(function(response) {
        if (response.result != "error") {
            console.log("SSN obtained for rides");
            ssn5 = response.ssn;       
           
            $http({
                method : 'POST',
                url : '/bk_customer_search_with_ssn',
                data : {"ssn": ssn5}
            }).success(function(response) {
                if (response.result != "error") {
                    console.log("Customer search with ssn");
                    console.log(response.value.latitude);
                    lat = response.value.latitude;
                    lng = response.value.longitude;
                   
                    $http({
                        method : 'POST',
                        url : '/bk_driver_selectAllAvailable',
                        data : {"latitude": lat,
                                   "longitude": lng },
                        }).success(function(response){
                            console.log("code is here for ssn");
                        //console.log(response.value[0].ssn);
                        $scope.srv = {};
                          console.log("The response frm UI");
                          console.log(response);
                          $scope.data = {};
                          $scope.data.getLevels = function() {
                            return response.value;
                          }
                        }).error(function(error){
                        console.log(error);
                        })
                   
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
 
=======
	var result;
	var ssn5;
	var lat;
	var lng;
	$http({
		method : 'POST',
		url : '/session_get_ssn',
		data : {}
	}).success(function(response) {
		if (response.result != "error") {
			console.log("SSN obtained for rides");
			ssn5 = response.ssn;		
			
			$http({
				method : 'POST',
				url : '/bk_customer_search_with_ssn',
				data : {"ssn": ssn5}
			}).success(function(response) {
				if (response.result != "error") {
					console.log("Customer search with ssn");
					console.log(response.value.latitude);
					lat = response.value.latitude;
					lng = response.value.longitude;
					
					$http({
						method : 'POST',
						url : '/bk_driver_selectAllAvailable',
						data : {"latitude": lat,
					  		 	"longitude": lng },
						}).success(function(response){
							console.log("code is here for ssn");
						//console.log(response.value[0].ssn);
						$scope.srv = {};
						  console.log("The response frm UI");
						  console.log(response);
						  $scope.data = {};
						  $scope.data.getLevels = function() {
						    return response.value;
						  }
						}).error(function(error){
						console.log(error);
						})
					
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
  
>>>>>>> a9f7e77fb2e784fc75430f9e8bb8dd05ac7e4820
})

	/*
		var socket = io.connect('http://localhost:3005');
		
		var driverSsn;
		function sendRequest(ssn){
			var data = {};
			data.ssn = driverSsn=ssn;
			data.request = 'Start Ride';
			socket.emit('Server', data);
			console.log(data);
		}	
	  
	  	socket.on('Customer', function (data) {
			console.log(data);
			if(data.ssn.toString() === driverSsn && data.request.toString() === 'Ride Accepted'){
				$("#reqBtn").addClass("hidden");	    
				$("#dialog-message").removeClass("hidden");
		    	$(function() {
					    $( "#dialog-message" ).dialog({
					      modal: true,
					      buttons: {
					        Ok: function() {
					          $( this ).dialog( "close" );
					          $("#startRideDiv").removeClass("hidden");
					        }
					      }
					    });
				});
			}
			
			if(data.ssn.toString() === driverSsn && data.request.toString() === 'Ride Ended'){
				$("#reqBtn").addClass("hidden");	    
				$("#dialog-message").addClass("hidden");
				$("#dialog-message2").removeClass("hidden");
				$("#startRideDiv").addClass("hidden");
		    	$(function() {
					    $( "#dialog-message2" ).dialog({
					      modal: true,
					      buttons: {
					        Ok: function() {
					          $( this ).dialog( "close" );
					          
					          $("#startNewRideDiv").removeClass("hidden");
					        }
					      }
					    });
				});
			}
	  });
*/