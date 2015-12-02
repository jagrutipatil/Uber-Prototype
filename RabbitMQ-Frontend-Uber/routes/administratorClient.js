var ejs = require("ejs");
var mq_client = require('./client');


function reviewDriver(req, res) {
	var msg_payload = {"requestQueue":"reviewDriver"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":results});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function reviewCustomer(req, res) {
	var msg_payload = {"requestQueue":"reviewCustomer"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":results});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


function searchbill_by_driverid(req, res) {
	console.log(req.body.driver_id);
	var msg_payload = {"driver_id": req.body.driver_id, "requestQueue":"searchbill_by_driverid"};	
	mq_client.make_request('administrator',msg_payload, function(err, results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function searchbill_by_customerid(req, res) {
	var msg_payload = {"customer_id": req.param("customer_id"), "requestQueue":"searchbill_by_customerid"};	
	mq_client.make_request('administrator',msg_payload, function(err, results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function searchbill_by_billid (req, res) {
	var msg_payload = {"billId": req.param("billId"), "requestQueue":"searchbill_by_billid"};	
	mq_client.make_request('administrator',msg_payload, function(err, results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function searchbill_by_date(req, res) {
	var msg_payload = {"rideDate": req.param("rideDate"), "requestQueue":"searchbill_by_date"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function rides_perdriver(req, res) {
    var msg_payload = { "requestQueue":"rides_perdriver"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"value": results.value, "result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}


function rides_percustomer(req, res) {
	var msg_payload = { "requestQueue":"rides_percustomer"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				res.send({"value": results.value, "result":"success"});
			} else {    
				res.send({"result":"error"});
			}
	});
}

function rides_perpickuplocation(req, res) {
	var msg_payload = {"requestQueue":"rides_perpickuplocation"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}


function rides_perdropofflocation(req, res) {
	var msg_payload = {"requestQueue":"rides_perdropofflocation"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}

function revenueperday(req, res) {
	var msg_payload = {"requestQueue":"revenueperday"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"value": results.value, "result":"success"});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}




function deletebill_billId(req, res) {
	var msg_payload = {"billId": req.param("billId"), "requestQueue":"deletebill_billId"};	
	mq_client.make_request('administrator',msg_payload, function(err,results){
		    console.log(results);
			if(results.code == 200){
				console.log("valid Login");				
				res.send({"result":"success", "value" : results.value});
			} else {    
				console.log("Invalid Login");
				res.send({"result":"error"});
			}
	});
}




exports.reviewDriver = reviewDriver;
exports.reviewCustomer= reviewCustomer;

exports.searchbill_by_driverid = searchbill_by_driverid;
exports.searchbill_by_customerid = searchbill_by_customerid;
exports.searchbill_by_billid = searchbill_by_billid;
exports.searchbill_by_date= searchbill_by_date;

exports.rides_perdriver = rides_perdriver; 
exports.rides_percustomer = rides_percustomer;
exports.rides_perpickuplocation = rides_perpickuplocation;
exports.rides_perdropofflocation = rides_perdropofflocation;

exports.revenueperday = revenueperday;
exports.deletebill_billId = deletebill_billId;










