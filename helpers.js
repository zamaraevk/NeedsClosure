var Model = require('./database.js');
var jwt  = require('jwt-simple');


var taskFuncs = {

/* TASK FUNCTIONS */


	getUserTasks: function(user, res){
		Model.task.find({"owner": user}, function(err, tasks){
			if(err){
				console.log("tasks not fetched", err);
			}
			console.log("tasks", tasks);
			res.send(tasks); //sends back array of tasks
		});
	},

	addTask: function(task, groupId, res) {
		var newTask = new Model.task(task);
		// Model.group.findByIdAndUpdate(groupId, {$push: } function(err, group)) 
		newTask.save(function(err){
			if(err) {
				console.log("error:", err);
			}
			console.log("Task Added!", newTask);
			res.send(newTask); //sends back added task
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

	editTask: function(id, edited, res){
		console.log("request id", id);
		console.log("edit body", edited);
		// updates the task name based on the request body and the id associated with it. 
		
		Model.task.update({"_id": id}, {
			name: edited.name

		}, function(err, obj) {
			if(err) {
				console.log("task update failed", err); 
			}
			res.send("task was updated"); 
		});
	},

	// getAllTasks: function(res){
	// 	Model.task.find({}, function(err, tasks){
	// 		if(err) {
	// 			console.log('tasks not fetched', err);
	// 		}
	// 		console.log("tasks successfully fetched");
	// 		res.send(tasks); //returns an array of objects where each object is a task with a unique ID

	// 	})

	// },


/* GROUP FUNCTIONS */


createGroup: function(groupName, res){
	var group = new Model.group({"name": groupName});
	group.save(function(err){
		if(err){
			console.log("group not created", err);
		}
		console.log("group created");
		res.send(group); //sends back group object
	})
},
	// add User to Group 
	addUserToGroup: function(username, groupId, res){
		Model.user.findOne({"username": username}, function(err, user){
			if(err){
				res.send("User not found", err)
			}

			if(!user.length) {
				Model.group.findOne({"_id": groupId}, function(error, group) {
					if(error){
						console.log("The group was not found", error); 
					}
					if(group.users.indexOf(user) >= 0) { 
						console.log("user already exists in group");
						res.send(new Error("user already exists in group"));
					}
					else{
						group.users.push(user); 
						group.save(function(err){
							console.log("Current members of group", group.users);
							res.send(user.username + " was added to group: " + group.name);
						})
					}
				})
			}
			else{
				res.send(new Error("user not found"));
			}

		})

		
	}, 
	
	getUsers: function(groupID, res){
		Model.group.findOne({"_id": groupID}, function(err, group){
			if(err){
				console.log("group not found", err);
			}
			console.log("Members of group:", group.users);
			res.send(group.users) //will return an array of user objects in the group
		})
	},

/* AUTHENTICATION FUNCTIONS */

	// adds a specified userId to a given group by passing in groupId and userId. 

	// addUserToGroup: function(userId, groupId, res){
	// 	Model.group.findByIdAndUpdate(groupId, {$push: {"users": userId}},
	// 		function(error) {
	// 			if(error){
	// 				console.log("The group was not found", error); 
	// 			}else {
	// 				res.send("UserId was added to group"); 
	// 			}
	// 		}
	// 	);
	// },
// query the groups collection and find the specified group by groupId then push the userId to the group 

// this only works for an array of groups. 
	addGroupToUser: function(userId, groupId, res){
		Model.user.findByIdAndUpdate(userId, {$push: {"groups": groupId}}, // query the user collection by userId and then update and push toe the user groups array. 
			function(err) {
				if(err) {
					console.log("user group property was not updated", err);
				}else {
					console.log("user group property was updated");
				}
			}
		); 
	}, 
	// not sure if mongoose populate would be relevant in this situation
	// need to test 

	addGroupToUsers: function(groupId, res) {
		Model.group.findOne({"_id": groupId}, function(error, group) {
			if(error) {
				console.log("there is an error with adding group to user", error);
			}else {
				group.users.forEach(function(userId) {
					Model.user.findByIdAndUpdate(userId, {$push: {"groups": groupId}}, 
						function(err) {
							if(err) {
								console.log("group not updated for user");
							}else {
								console.log("group updated for user"); 
							}
						})
				})
			}
		})
	},

	collectGroupTasks: function(groupId, res){
		Model.group.findOne({"_id": groupId}, function(error, group) {
			if(error){
				console.log("Group tasks weren't retrieved", error); 
			}
			console.log("successfully retrieved group tasks")
			res.send(group.tasks); 
		});
	},

	getGroups: function(userId, res) {
		Model.user.findOne({"_id": userId}, function(error, user) {
			if(error) {
				console.log("Error in finding groups", error);
			}else {
				if(!user.groups.length) {
					console.log("user groups empty");
				}else {
					res.send(user.groups); 
				}
			}
		})
	}, 
	//collect the tasks for a specific groupId 

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
				console.log("new user saved");
				var token = jwt.encode(user, 'secret'); //create new token
        res.json({"token": token, "user": {"id": user._id, "username": user.username}}); //send new token and user object
			})

			}
			else {
				console.log("user already exists: ", user);
				next(new Error("user already exists"));
			}
		})
	},

	signin: function(reqUser, res, next){
		Model.user.find({"username": reqUser.username}, function(err, user){
			if(err){ //if error in query
				next("Error: ", error);
			}
			if(!user.length){ //if user not found
				next(new Error("username does not exist"));
			}
			else{ //if user found
				user[0].comparePassword(reqUser.password, function(err, isMatch){
					if(err) {throw err;}
					if(!isMatch){
						next(new Error("Incorrect password")) //will send an error if incorrect password
					}
					else{
						console.log("password correct!");
						var token = jwt.encode(user[0], 'secret'); //create new token
            res.json({"token": token, "user": {"id": user[0]._id, "username": user[0].username}}); //send new token and user object
					}
				})
			}
		})
	}, 

	checkAuth: function(req, res, next){
		var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } 
    else {
      var user = jwt.decode(token, 'secret');
      console.log("Decoded user:", user);
      Model.user.find(user, function(err, user){
      	if(err){
      		next("Error: ", error);
      	}
      	if(!user.length){ //user not found
      		res.status(401).send();
      	}
      	else{ //token decoded and user found in database
      		console.log("user authenticated")
      		res.status(200).send();
      	}
      });
    }
	}
}


module.exports = taskFuncs;
