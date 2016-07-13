var Model = require('./database.js');

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
		Model.task.find({}, function(err, tasks){
			if(err) {
				console.log('tasks not fetched', err);
			}
			console.log("tasks successfully fetched");
			res.send(tasks); //returns an array of objects where each object is a task with a unique ID

		})

	},
	addTask: function(task, res) {
		var newTask = new Model.task(task);
		newTask.save(function(err){
			if(err) {
				console.log("error:", err);
			}
			console.log("Task Added!", newTask);
			res.send(newTask);
		})
	},
	deleteTask: function(id, res){
		Model.task.remove({"_id": id}, function (err) { 
			if(err){
				console.log("Error: ", err)
			}
			res.send("task removed");
		});

	},
	completeTask: function(id, res){
		Model.task.update({"_id": id}, {
			completed: true

		}, function(err){
			if(err) {
				console.log("task not marked as complete", err);
			}
			res.send("task marked as complete");
		});
	},

	signup: function(newUser, res, next) {
		Model.user.find({"username": newUser.username}, function(err, user){
			if(err) {
				console.log("Error: ", error);
			}
			if(!user.length) { //if a user is not found, an empty array is returned
				console.log("user does NOT already exist");
				var user = new Model.user(newUser);
				user.save(function(err){
					if(err) {
						console.log("new user not saved", err);
					}
				res.send("user saved");
			})

			}
			else {
				console.log("user already exists: ", user);
				next(new Error("user already exists"));
			}
		})
	}		
}


module.exports = taskFuncs;
