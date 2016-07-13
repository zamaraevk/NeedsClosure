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

app.get('/api/signedin', function(req, res, next){
	//see helpers.js for format of request. It checks the req.headers['x-access-token']
	console.log("signedIn request received");
	taskFuncs.checkAuth(req, res, next);
})

app.post('/api/signin', function(req, res, next){
	console.log("sign-in request received");
	// format of request object is same as signup
	var user  = req.body;
	taskFuncs.signin(user, res, next);

})

app.get('/api/tasks', function(req, res){
	//handle getAll tasks
	taskFuncs.getAllTasks(res);
})

app.post('/api/usertasks', function(req, res){
	/* proper format of request
	{
		"user": "5787b4442cb0dadd096e94d7" // this is the same ID you received when the user signs in
	}

	*/
	console.log("request received at usertasks for: ", req.body.user);
	var user = req.body.user;
	taskFuncs.getUserTasks(user, res);
})

app.post('/api/tasks', function(req, res){
	//handle add task
	//need to check format of req.body
	//need to have proper res.end (should send 201)
	console.log('request received at addTask');
	console.log("incoming task", req.body);
	var task = req.body;
	var owner = req.body.userID;
	taskFuncs.addTask(task, owner, res);

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

app.put('/api/tasks/edit', function(req, res, next){        
	//handle edit of the task name 
	// needs the request body and id 
	console.log("task was updated", req.body); 
	taskFuncs.editTask(req.body._id, req.body, res, next); 
})

module.exports = app;
