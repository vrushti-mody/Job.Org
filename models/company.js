var mongoose = require('mongoose');
var Schema = mongoose.Schema;

companySchema = new Schema( {
	
	unique_id: Number,
	email: String,
	name: String,
	password: String,
	address: String,
	address2:String,
	city:String,
	state:String,
	zip:String
}),
Company = mongoose.model('Company', companySchema);

module.exports = Company;