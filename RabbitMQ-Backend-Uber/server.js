//super simple rpc server example
//Advanced Message Queuing Protocol (AMQP)
var amqp = require('amqp')
, util = require('util');

var routes = require('./routes');
var user = require('./routes/user');
var login = require('./services/login');
var http = require('http');
var path = require('path');
var amqp = require('amqp')

var cnn = amqp.createConnection({host:'127.0.0.1'});

cnn.on('ready', function(){
	console.log("listening on login_queue");

	cnn.queue('customer', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			
			login.handle_request(message, function(err,res){

				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	

});