var ejs = require("ejs");
var administrator = require("./administrator");

	var res = {};	
	function handle_request (msg, callback) {


	if(msg.requestQueue=="reviewDriver"){
		administrator.reviewDriver(function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="reviewCustomer"){
		administrator.reviewCustmer(function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="searchbill_by_driverid"){
		administrator.searchbill_by_driverid(msg.driver_id,function(err, res) {
			callback(err, res);
		});
	}
	
	if(msg.requestQueue=="searchbill_by_customerid"){
		administrator.searchbill_by_customerid(msg.customer_id,function(err, res) {
			callback(err, res);
		});
	}
        
        if(msg.requestQueue=="searchbill_by_billId"){
		administrator.searchbill_by_billid(msg.billId,function(err, res) {
			callback(err, res);
		});
	}
        
        
        
        if(msg.requestQueue=="searchbill_by_date"){
		administrator.searchbill_by_date(msg.rideDate,function(err, res) {
			callback(err, res);
		});
	}
        
        
        
        
        
        if(msg.requestQueue=="rides_perdriver"){
		administrator.rides_perdriver(function(err, res) {
			callback(err, res);
		});
	}
        
    
        if(msg.requestQueue=="rides_percustomer"){
		administrator.rides_percustomer( function(err, res) {
			callback(err, res);
		});
	}
        
        
        
        if(msg.requestQueue=="rides_perpickuplocation"){
		administrator.rides_perpickuplocation(function(err, res) {
			callback(err, res);
		});
	}
        
        
        
        if(msg.requestQueue=="rides_perdropofflocation"){
		administrator.rides_perdropofflocation(function(err, res) {
			callback(err, res);
		});
	}
        
        
         if(msg.requestQueue=="revenueperday"){
		administrator.revenueperday( function(err, res) {
			callback(err, res);
		});
	}
        
        
        if(msg.requestQueue=="deletebill_billId"){
		administrator.deletebill_billId(msg.billId,function(err, res) {
			callback(err, res);
		});
	}
        
 }

exports.handle_request = handle_request;