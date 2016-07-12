var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

mongoose.connect('mongodb://needsclosure:needsclosure1@ds021289.mlab.com:21289/needsclosure'); 

userSchema = new Schema({
	username: String,
	password: String, 
	token: String, 
	tasks: Array, 
	Friends: Array
}); 

var User = new mongoose.model('User', userSchema);

module.exports = User; 
