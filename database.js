var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://needsclosure:needsclosure1@ds021289.mlab.com:21289/needsclosure');

var taskSchema = new Schema({
  name: String,
  createdAt: Date,
  dueDate: Date,
  completed: Boolean,
  users: [{type: Schema.Types.ObjectId, ref: 'User'}]
});


var Task = mongoose.model('Task', taskSchema);

//User schema 
var userSchema = new Schema({
	username: String,
	password: String, 
	token: String, 
	tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}] 
	// friends: [userSchema]
}); 

var User = mongoose.model('User', userSchema);


module.exports = {user: User, task: Task}; 