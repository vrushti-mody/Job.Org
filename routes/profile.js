var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Application = require('../models/application');


router.get('/:id', function (req, res, next) {
    userid=req.params.id
	console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/user/profile');
		}else{
		
			User.findOne({unique_id:userid},function(err,result){
				console.log("result");
				console.log(result);
				if(!result){
					res.redirect('/user/profile');
				}else{
                    Application.find({userid:userid},function(err,ans){
                        console.log("ans");
                    
                        if(!ans){
                            res.redirect('/user/profile');
                        } else{     
							console.log(ans);   
                    		 res.render('userprofile.ejs', {"name":data.name,"email":data.email,"type":data.type,result,"result1":ans});
                }
            });
			
		}
	});
		}
	});
   
	
});




module.exports = router;