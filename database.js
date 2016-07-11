var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://needsclosure:needsclosure1@ds021289.mlab.com:21289/needsclosure');

var taskSchema = new Schema({
  name: String,
  assignees: Array,
  createdAt: Date,
  dueDate: Date,
  completed: Boolean
});


var Task = mongoose.model('Task', taskSchema);


module.exports = Task;