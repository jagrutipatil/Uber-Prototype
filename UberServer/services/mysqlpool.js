var ejs = require("ejs");
var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100, 
	  host 		: 'localhost',
	  user 		: 'root',
	  password  : 'password',
	  database  : 'test',
	  port	    : 3306
});	



function executeQuery(callback, sqlQuery) {

	var connection = pool.getConnection(function(err,connection){
        if (err) {
            connection.release();
            console.log("Error in connection database");
            return;
          }  
        	console.log("Query:" + sqlQuery);
        	connection.query( sqlQuery, function(err, rows) { 
    		connection.release();
			if (err) {
				console.log(err.message);
			} else {
				console.log("DB Data:" + rows);
				callback(err, rows);
			}
			
		});
	});
	
}

exports.executeQuery = executeQuery;