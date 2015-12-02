var driverSSN;

$.ajax({
            type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
            url         : '/session_get_ssn', // the url where we want to POST
            data        :  {}
        }).done(function(data) {
                driverSSN = data.driver.ssn;                
        });

var socket = io.connect('http://localhost:3000');

setTimeout(function(){
    console.log(driverSSN);
    socket.on('Driver', function (data) {
        console.log(data);
        console.log(data.request.toString());
        if(data.ssn.toString() === driverSSN && data.request.toString() === 'Start Ride'){
         	$("#dialog-message").removeClass("hidden");
        	$(function() {
    			    $( "#dialog-message" ).dialog({
    			      modal: true,
    			      buttons: {
    			        Ok: function() {
    			          $( this ).dialog( "close" );
    			          socket.emit('Server', { ssn : driverSSN, request: 'Ride Accepted' });
    			          $("#endBtn").removeClass("hidden");
    			        }
    			      }
    			    });
    		});
        }
      });
      
      
 },300);

function endRide(){
		socket.emit('Server', { ssn : driverSSN, request: 'Ride Ended' });
		console.log("Function end ride");
		window.open('/customerRating');
		$("#endBtn").addClass("hidden");
		$("#afterLogin").removeClass("hidden");
}