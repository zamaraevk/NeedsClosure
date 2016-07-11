var app = require('/server.js');
var taskFuncs = require('/helpers.js');
var bodyParser = require('body-parser');


app.get('/api/tasks', function(req, res){
	//handle getAll tasks
})

app.post('/api/tasks', function(req, res){
	//handle add task
	//need to check format of req.body
		//console.log(req.body);
	//need to have proper res.end (should send 201)
	var task = req.body;
	taskFuncs.addTask(task);

})

app.delete('/api/tasks', function(req, res){
	//handle delete task
})

app.put('/api/tasks', function(req, res){
	//handle complete task
})