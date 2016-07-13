angular.module('tasks', [])

.controller('TasksController', function($scope, Tasks){

  angular.extend($scope, Tasks);
  //will be submitted to server in POST request body containing the new task input data
    //when ready to send requests to server, add "Tasks" controller as function input variable
  $scope.allTasks = [];
  $scope.all;
  //function to get all existed tasks from db
  $scope.getData = function(){
    $scope.all = $scope.fetchAllTasks();
    $scope.all.then(function(resp){
      console.log(resp)
      $scope.allTasks = resp;
    })
  }
    //initial function call
    $scope.getData();


  $scope.onSubmit = function(input){
    console.log(input);
    $scope.send = {
      	name: input,
      	createdAt: new Date(),
      	completed: false
      };
    $scope.addTask($scope.send);
    //clear input after task has been added
    $scope.input = null;
    //update task list
    $scope.getData();
  }

  $scope.deleteById = function(task){
    $scope.deleteTask({id: task});
    $scope.getData();
  }
  $scope.complete = function(task){
    $scope.completeTask({id: task});
    $scope.getData();
  }
})
