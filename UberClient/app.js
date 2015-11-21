
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var login = require('./routes/login');
//var group = require('./routes/group');
var http = require('http');
var path = require('path');
var amqp = require('amqp')


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
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', login.home);
app.post('/login', login.signin);
app.post('/signup', login.signup);
app.get('/profile', login.profile);
app.get('/home', login.profileHome);
//app.post('/createGroup', group.createGroup);
//app.post('/deleteGroup', group.deleteGroup);
//app.post('/getGroup', group.getGroup);
//app.post('/addToGroup', group.addToGroup);
//app.post('/deleteFromGroup', group.deleteFromGroup);
//app.post('/getAllGroups', group.getAllGroups);
//app.post('/getAllUsers', user.getAllusers);
//app.get('/group', group.group); 
app.post('/logout', login.logout);
app.get('/afterlogout', login.afterlogout);
//app.post('/sendFriendRequest', user.sendFriendRequest);
//app.post('/acceptFriendRequest', user.acceptFriendRequest);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
