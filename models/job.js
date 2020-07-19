var mongoose = require('mongoose');
var Schema = mongoose.Schema;


jobSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	name: String,
	title: String,
	location: String,
	description:String,
	duration:String,
	salary:Number,
	userid:{type:String, required: true}
})




Job1 = mongoose.model('Job1', jobSchema);


module.exports = Job1;



