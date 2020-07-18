var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Application = require('../models/application');


router.get('/user', function (req, res, next) {
    console.log("profile");
    name=req.session.name;
    email=req.session.email;
    type=req.session.type;
	Application.find({userid:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/user/profile');
		}else{
			//console.log("found");
					return res.render('userapplications.ejs', {"name":name,"email":email,"type":type,"result":data});
				
		
			
		}
	});
});
module.exports = router;