exports.ssn = function(req, res){
	if(req.ubersession){
		if(req.ubersession.user){
			res.send({"ssn": req.ubersession.user.ssn, "result":"success"});			
		}else{
			console.log("Invalid Session");
			res.send({"result":"error"});
		}			
	}else{
		console.log("Invalid Session");
		res.send({"result":"error"});
	}
};


exports.isAuthUser = function isAuthUser(req, res, next) {
		if(req.ubersession){
			if(req.ubersession.user){
				return next();
			}
		}    
    res.redirect('/');
};

exports.isAuthDriver = function isAuthDriver(req, res, next) {
	if(req.ubersession){
		if(req.ubersession.driver){
			return next();
		}
	}    
res.redirect('/');
};
