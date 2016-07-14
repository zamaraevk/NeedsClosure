angular.module('tasks', [])

.controller('TasksController', function($scope, Tasks, Auth){

  angular.extend($scope, Tasks, Auth);
  //will be submitted to server in POST request body containing the new task input data
    //when ready to send requests to server, add "Tasks" controller as function input variable
  $scope.allTasks = [];
  $scope.all;
  $scope.currentUser = Auth.currUser.user.username;
  //function to get all existed tasks from db
  $scope.getData = function(){
    $scope.all = $scope.getUserTasks({user: Auth.currUser.user.id});
    $scope.all.then(function(resp){
      console.log(resp)
      $scope.allTasks = resp;
    })
  }
    //initial function call
    $scope.getData();


  $scope.onSubmit = function(input){
      console.log(Auth.currUser.user.id);
    $scope.send = {
      	name: input,
      	createdAt: new Date(),
      	completed: false,
        owner:Auth.currUser.user.id
      };
    $scope.addTask($scope.send, function(resp){
      //clear input after task has been added
      $scope.input = null;
      //update task list
      $scope.getData();
    })
  }
  $scope.deleteById = function(task){
    $scope.deleteTask({id: task}, function(resp){
      $scope.getData();
    });
  }
  $scope.complete = function(task){
    $scope.completeTask({id: task}, function(resp){
      $scope.getData();
    });
  }
})
