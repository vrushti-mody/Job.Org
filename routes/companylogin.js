var express = require('express');
var router = express.Router();
var User = require('../models/user');




//----------------------REGISTER-----------------------------------
router.get('/register', function (req, res, next) {
	return res.render('registercompany.ejs');
});

router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;


	if(!personInfo.email || !personInfo.name || !personInfo.password || !personInfo.cpassword){
		res.send();
	} else {
		if (personInfo.password == personInfo.cpassword) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							name: personInfo.name,
							password: personInfo.password,
							passwordConf: personInfo.cpassword,
							address:personInfo.address,
							address2:personInfo.address2,
							city:personInfo.city,
							state:personInfo.state,
							zip:personInfo.zip,
							type:personInfo.type
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
				
					res.redirect('/')
				}else{
					res.send({"Error":"Email is already used."});
				}

			});
		}else{
			res.send({"Error":"password is not matched"});
		}
	}
});


module.exports = router;
