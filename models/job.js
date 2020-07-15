var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ApplicationSchema=mongoose.Schema({
    applicationid:{type:Number, required: true},
    userid:{type:Number, required: true},
    applicationStatus:{type:String, default: "Applied"},
	title: String,
	salary:String,
	username:String,
	useremail:String
	
})
jobSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	name: String,
	title: String,
	location: String,
	description:String,
	duration:String,
	salary:Number
})




Job = mongoose.model('Job', jobSchema);
Application = mongoose.model('Application', ApplicationSchema);

module.exports = Job,Application;



