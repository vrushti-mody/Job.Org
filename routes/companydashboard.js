var express = require('express');
var router = express.Router();
var User = require('../models/company');


router.get('/dashboard', function (req, res, next) {
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/company/');
		}else{
			//console.log("found");
			return res.render('companyprofile.ejs', {"name":data.name,"email":data.email,"role":data.role});
		}
	});
});
module.exports = router;