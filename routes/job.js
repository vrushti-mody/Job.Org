var express = require('express');
var router = express.Router();
var Job = require('../models/job');
var User = require('../models/company');
var Application = require('../models/job');


router.get('/', function (req, res, next) {
    console.log("profile");
	User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/companyprofile/dashboard');
		}else{
			//console.log("found");
			return res.render('jobform.ejs', {"name":data.name,"email":data.email});
		}
	});
	
});

router.post('/', function(req, res, next) {
    var personInfo = req.body;
    console.log(req.body);
    var email;
    var name;
    User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
		
		}else{
            email=data.email;
            name=data.name}
	    

		
		    var c;
					Job.findOne({},function(err,data){
                        
						if (data) {
							console.log("if");
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newJob = new Job({
							unique_id:c,
                            email:email,
                            name:name,
                            title:personInfo.title,
                            location:personInfo.location,
                            description: personInfo.description,
                            duration:personInfo.duration,
                            salary:personInfo.salary
						});

						newJob.save(function(err, jobs){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
				
					
			
        
                return res.redirect('/companyprofile/dashboard')
	});
	
				

		
		
});


router.get('/:id', function (req, res, next) {
	const id=req.params.id
	const userId=req.session.userId
    Job.findOne({unique_id:id},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
			res.redirect('/user/profile');
		}else{
			Application.findOne({applicationid:id,user_id:userId},function(err,result){
				console.log("data");
				console.log(data);
				if(!result){
					 res.render('applyforjob.ejs', {data,apply:"false","email":req.session.email});
				}else{
					
					//console.log("found");
					 res.render('applyforjob.ejs', {data,apply:"true","email":req.session.email});
				}
			});
			//console.log("found");
			 
		}
	});
	
});

module.exports = router;
