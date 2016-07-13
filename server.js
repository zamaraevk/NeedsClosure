var express = require('express');
var taskFuncs = require('./helpers.js');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname + "/client"));
app.use(express.static(__dirname + "/node_modules"));
app.use(bodyParser.json());

console.log(__dirname + "/node_modules");


app.listen(process.env.PORT || 3000, function(){
  console.log('Server is running');
});


app.post('/api/signup', function(req, res, next){
	//add new user
	/* 
	proper format of request (password is in plain-text when passed from front-end):

	{
			"username": "harish",
	    "password": "abc123"

	}

	*/
	var newUser = req.body;
	taskFuncs.signup(newUser, res, next);
})

app.post('/api/signin', function(req, res, next){
	console.log("sign-in request received");
	// format of request object is same as signup
	var user  = req.body;
	taskFuncs.signin(user, res, next);

})

app.get('/api/tasks', function(req, res){
	//handle getAll tasks
	console.log("request received at getAllTasks");
	taskFuncs.getAllTasks(res);

})


app.post('/api/tasks', function(req, res){
	//handle add task
	//need to check format of req.body
	//need to have proper res.end (should send 201)
	console.log('request received at addTask');

	var task = req.body;
	taskFuncs.addTask(task, res);

})

app.post('/api/tasks/delete', function(req, res){
  //console.log('1KONSTANTIN', req.params.id);
	/* proper format of request:
		{
			"id": "5783ec2a12cda2db6ce7ac91"
		}
	*/
	console.log("request received at deleteTask", req.body.id);
	taskFuncs.deleteTask(req.body.id, res);
})

app.put('/api/tasks', function(req, res){
	//handle complete task
	//format of request same as delete request
	console.log("request received at completeTask for:", req.body.id);
	taskFuncs.completeTask(req.body.id, res);
})

module.exports = app;
