var express = require('express');
var router = express.Router();
var Job = require('../models/job');
var User = require('../models/user');
var Application = require('../models/application');


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
	var id;
	var userid=req.session.userId
	console.log(userid);
    User.findOne({unique_id:req.session.userId},function(err,data){
		console.log("data");
		console.log(data);
		if(!data){
		
		}else{
            email=data.email;
			name=data.name
			id=data.unique_id;
		}
	    

		
		    var c;
					Job.findOne({},function(err,result){
                        
						if (result) {
							console.log("if");
							c = result.unique_id + 1;
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
                            salary:personInfo.salary,
                            userid:id
						});
						console.log(newJob);
						newJob.save(function(err, jobs){
							if(err)
								console.log(err);
							else
								console.log('Success');
								res.redirect('/user/profile')
						});

					}).sort({_id: -1}).limit(1);
				
					
			
        
                 
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
			Application.findOne({applicationid:id,userid:userId},function(err,result){
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

router.post('/:id', function(req, res, next) {
    var appInfo = req.body;
	console.log(req.body);

	var applicationid= req.params.id
    var userid=req.session.userId
	var title=appInfo.title
	var salary=appInfo.salary
	
	var companyid= appInfo.companyid
	User.findOne({unique_id:req.session.userId},function(err,data){
	var application = new Application({
		applicationid:applicationid,
		userid:userid,
		title:title,
		salary:salary,
		username:data.name,
		useremail:data.email,
		companyid:companyid
	});

	application.save(function(err, jobs){
		if(err)
		{
			console.log(err);
		}
		else{
			 res.redirect('/user/profile')
		}
			
	});
	});
		
});




module.exports = router;