var app = angular.module('maps',[]);
console.log("Maps_fs.js");
	var generateUniqueId = function(){
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
	};

	function initialize() {

	    var input = document.getElementById('searchTextField');
	    var input2 = document.getElementById('searchTextField2');
	
	    /* restrict to multiple cities? */
	    var options = {
	       types: ['address'],
	       componentRestrictions: {country: "us"}
	    };
	
	
	    var autocomplete = new google.maps.places.Autocomplete(input, options);
	    var autocomplete = new google.maps.places.Autocomplete(input2, options);
	 }
	 google.maps.event.addDomListener(window, 'load', initialize);
	 
	function initAutocomplete() {
	  var map = new google.maps.Map(document.getElementById('map'), {
	    center: {lat: -33.8688, lng: 151.2195},
	    zoom: 15,
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  });
		
	if (navigator.geolocation) {
     navigator.geolocation.getCurrentPosition(function (position) {
         initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
         map.setCenter(initialLocation);
     });
 	}
  	
 	
 	$(document).ready(function(){
    	$("#form").submit(function(){
    	
    		var og = $(".orig").val();
    		var dn = $(".dest").val();
		    var origin = og,
		        destination = dn,
		        service = new google.maps.DistanceMatrixService();
		console.log(og+" "+dn);
		    service.getDistanceMatrix(
		        {
		            origins: [origin],
		            destinations: [destination],
		            travelMode: google.maps.TravelMode.DRIVING,
		            avoidHighways: false,
		            avoidTolls: false
		        }, 
		        callback
		    );
		
		    function callback(response, status) {
		        var orig = $(".orig").val();
		        var dest = $(".dest").val();
		
		        if(status=="OK") {
		        	console.log("Maps_f.js");
		        	console.log(response);
		            orig.value = response.originAddresses[0];
		            dest.value = response.destinationAddresses[0];
		            dist.value = response.rows[0].elements[0].distance.text;
		            dur.value = response.rows[0].elements[0].duration.text;
		        } else {
		            alert("Error: " + status);
		        }
		    }
		    
		         var directionsService = new google.maps.DirectionsService();
			     var directionsDisplay = new google.maps.DirectionsRenderer();
			
			     var map = new google.maps.Map(document.getElementById('map'), {
			       zoom:7,
			       mapTypeId: google.maps.MapTypeId.ROADMAP
			     });
			
			     directionsDisplay.setMap(map);
			     directionsDisplay.setPanel(document.getElementById('panel'));
			
			     var request = {
			       origin: origin, 
			       destination: destination,
			       travelMode: google.maps.DirectionsTravelMode.DRIVING
			     };
			
			     directionsService.route(request, function(response, status) {
			       if (status == google.maps.DirectionsStatus.OK) {
			         directionsDisplay.setDirections(response);
			       }
			     });
			     
			});
		});
}	

