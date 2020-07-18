var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	name: String,
	password: String,
	address: String,
	address2:String,
	city:String,
	state:String,
	zip:String,
	type:String
}),
User = mongoose.model('User', userSchema);

module.exports = User;