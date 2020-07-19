var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Application = require('../models/application');


router.get('/user', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/user/profile');
		}else{
			//console.log("found");
			Application.find({userid:data.unique_id},function(err,result){
				console.log("data");
				console.log(result);
				if(!result){
					res.redirect('/user/profile');
				}else{
			return res.render('userapplications.ejs', {"name":data.name,"email":data.email,"type":data.type,"result":result});
		}
	});
		}
	});
   
	
});


router.get('/company', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/user/profile');
		}else{
			//console.log("found");
			Application.find({companyid:req.session.userId},function(err,result){
				console.log("data");
				console.log(result);
				if(!result){
					res.redirect('/user/profile');
				}else{
			return res.render('companyapplication.ejs', {"name":data.name,"email":data.email,"type":data.type,"result":result});
		}
	});
		}
	});
   
});


router.post('/company', function (req, res, next) {
	id=req.body.id
	applicationStatus=req.body.applicationStatus
	Application.update (
		{ _id : id },
		{ $set : { applicationStatus:applicationStatus } },
		function( err, result ) {
			if ( err ) throw err;
			res.redirect('/application/company')
		}
	);
});







module.exports = router;