var Task = require('./database.js');

/* proper format of task document

var taskSchema = new Schema({
  name: String,
  assignees: Array,
  createdAt: Date,
  dueDate: Date,
  completed: Boolean
});


Example Task Format that should be passed from front-end:
{
	name: "pick up groceries",
	createdAt: new Date(),
	completed: false
})


*/

var taskFuncs = {

	getAllTasks: function(){

	},
	addTask: function(task) {
		var newTask = new Task(task);

		newTask.save(function(err){
			if(err) {
				console.log("error:", err);
			}
			console.log("Task Added!", newTask);
			return newTask;
		})
	},
	deleteTask: function(){

	},
	completeTask: function(){

	}


}

module.exports = taskFuncs;
