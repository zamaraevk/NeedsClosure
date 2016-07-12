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



app.get('/api/tasks', function(req, res){
	//handle getAll tasks
	console.log("request received at getAllTasks");
	taskFuncs.getAllTasks(res);

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

module.exports = app;
