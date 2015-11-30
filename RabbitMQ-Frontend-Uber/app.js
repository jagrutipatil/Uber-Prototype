
/**
 * Module dependencies.
 */

var sessions = require('client-sessions');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var routes = require('./routes');
var customer = require('./routes/customerClient');
var driver = require('./routes/driverClient');
var delegator = require('./routes/delegatorClient');
var bill = require('./routes/billingClient');
var rides = require('./routes/ridesClient');

var http = require('http');
var path = require('path');
var amqp = require('amqp');
var session = require('./routes/session');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.bodyParser());
app.use(sessions({
    cookieName: 'ubersession',
    secret: 'codeishere',
    duration: 24 * 60 * 60 * 1000,
    activeDuration: 1000 * 60 * 5 
}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/:name', rides.partials);
app.get('/loginPage', delegator.loginPage);
app.get('/loginCustomer', delegator.loginCustomer);
app.get('/signupCustomer', delegator.signupCustomer);
app.get('/loginDriver', delegator.loginDriver);
app.get('/signupDriver', delegator.signupDriver);
app.get('/updateDriver', session.isAuthDriver, delegator.updateDriver);
app.get('/updateCustomer', session.isAuthUser, delegator.updateCustomer);
app.get('/customerProfile', session.isAuthUser, delegator.updateCustomer);
app.get('/customerPayment', session.isAuthUser, delegator.updatePaymentCustomer);

app.get('/customerDashboard', session.isAuthUser, delegator.customerDashboard);

app.get('/admin', delegator.admin);
app.get('/', delegator.home);
app.get('/logout', function (req, res) {
	  req.ubersession.reset();
	  res.redirect('/');
});

app.post('/session_get_ssn', session.ssn);

app.post('/bk_customer_signin', customer.signin);
app.post('/bk_customer_signup', customer.signup);
app.post('/bk_customer_remove_with_email', customer.remove_with_email);
app.post('/bk_customer_remove_with_ssn', customer.remove_with_ssn);
app.post('/bk_customer_selectAll', customer.selectAll);
app.post('/bk_customer_selectAllUnApproved', customer.selectAllUnApproved);
app.post('/bk_customer_search_with_name', customer.search_with_name);
app.post('/bk_customer_search_with_ssn', customer.search_with_ssn);
app.post('/bk_customer_search_with_email', customer.search_with_email);
app.post('/bk_customer_update', customer.update);
app.post('/bk_customer_updatePayment', customer.updatePayment);
app.post('/bk_customer_approve', customer.approve);

app.post('/bk_driver_signin', driver.signin);
app.post('/bk_driver_signup', driver.signup);
app.post('/bk_driver_remove_with_email', driver.remove_with_email);
app.post('/bk_driver_remove_with_ssn', driver.remove_with_ssn);
app.post('/bk_driver_selectAll', driver.selectAll);
app.post('/bk_driver_selectAllUnApproved', driver.selectAllUnApproved);
app.post('/bk_driver_search_with_name', driver.search_with_name);
app.post('/bk_driver_search_with_ssn', driver.search_with_ssn);
app.post('/bk_driver_update', driver.update);
app.post('/bk_driver_approve', driver.approve);

//rides
app.post('/bk_rides_register', rides.register);

//billing module
app.post('/billGenerate', bill.billGenerate);
app.post('/estimate', bill.estimate);
app.get('/getUserBills', bill.getUserBills);
app.get('/getBill', bill.getBill);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
