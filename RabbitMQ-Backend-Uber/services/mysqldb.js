var ejs = require('ejs');
var mysql = require('mysql');

function getConnection() {
	var conn = mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : 'linux2015',
		database : 'testdb',
		port : 3306
	});
	return conn;
}

function executeQuery(callback, sqlQuery) {
	var conn = getConnection();
	console.log("Query:" + sqlQuery);
	
	conn.query(sqlQuery, function(err, rows, fields) {
		if (err) {
			console.log(err.message);
		} else {
			console.log("DB Data:" + rows);
			callback(err, rows);
		}
	});
	console.log("Connection Closed");
	conn.end();
}

exports.executeQuery = executeQuery;