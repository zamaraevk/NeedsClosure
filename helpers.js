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
	"name": "pick up groceries",
	"createdAt": new Date(),
	"completed": false
})


*/

var taskFuncs = {

	getAllTasks: function(res){
		Task.find({}, function(err, tasks){
			if(err) {
				console.log('tasks not fetched', err);
			}
			console.log("tasks successfully fetched");
			res.send(tasks); //returns an array of objects where each object is a task with a unique ID

		})

	},
	addTask: function(task, res) {
		var newTask = new Task(task);
		newTask.save(function(err){
			if(err) {
				console.log("error:", err);
			}
			console.log("Task Added!", newTask);
			res.send(newTask);
		})
	},
	deleteTask: function(id, res){
		Task.remove({"_id": id}, function (err) { 
			if(err){
				console.log("Error: ", err)
			}
			res.send("task removed");
		});

	},
	completeTask: function(id, res){
		Task.update({"_id": id}, {
			completed: true

		}, function(err){
			if(err) {
				console.log("task not marked as complete", err);
			}
			res.send("task marked as complete");
		});
	}


}

module.exports = taskFuncs;
