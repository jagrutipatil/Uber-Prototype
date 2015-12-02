exports.ssn = function(req, res){
	if(req.ubersession){
		if(req.ubersession.user){
			res.send({"ssn": req.ubersession.user.ssn, "result":"success"});			
		}else if(req.ubersession.driver){

			console.log("Session fetchedfor Driver");
			console.log(req.ubersession.driver.ssn);
			res.send({"driver": req.ubersession.driver, "result":"success"});
			console.log(req.ubersession.driver);

		}else{
			console.log("Invalid Session");
			res.send({"result":"error"});
		}			
	}else{
		console.log("Invalid Session");
		res.send({"result":"error"});
	}
};


exports.isAuthUser = function(req, res, next) {
		if(req.ubersession){
			if(req.ubersession.user){
				return next();
			}
		}    
    res.redirect('/');
};

exports.isAuthDriver = function(req, res, next) {
	if(req.ubersession){
		if(req.ubersession.driver){
			return next();
		}
	}    
res.redirect('/');
};

exports.skipAuthUser = function(req, res, next) {
	if(req.ubersession){
		if(req.ubersession.user){
			res.redirect('/customerDashboard');
		}
	}    
return next();
};

exports.skipAuthDriver = function(req, res, next) {
	if(req.ubersession){
		if(req.ubersession.driver){
			res.redirect('/');
		}
	}    
return next();

};
