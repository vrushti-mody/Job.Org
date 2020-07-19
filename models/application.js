var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ApplicationSchema=mongoose.Schema({
	
    applicationid:{type:Number, required: true},
    userid:{type:Number, required: true},
    applicationStatus:{type:String, default: "Applied"},
	title: String,
	salary:String,
	username:{type:String, required: true},
	useremail:{type:String, required: true},
	companyid:{type:String, required: true}
	
})

Application = mongoose.model('Application', ApplicationSchema);

module.exports = Application;