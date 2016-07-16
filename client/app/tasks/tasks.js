angular.module('tasks', [])

.controller('TasksController', function($scope, $window, Tasks, Auth, Proj){

  angular.extend($scope, Tasks, Auth);
  $scope.cUser = $window.localStorage.getItem('user.fridge');
  $scope.uID = $window.localStorage.getItem('id.fridge');
  if(!Auth.isAuth()) { Auth.signout()}
  //will be submitted to server in POST request body containing the new task input data
    //when ready to send requests to server, add "Tasks" controller as function input variable
  $scope.allTasks = [];
  $scope.all;

  //PROJECT FUNCTIONALITY
  $scope.project = {};
  $scope.members = [];
  $scope.allProjects = [];

  $scope.addProject = function(){
    console.log($scope.project);
    Proj.addProject($scope.project)
    .then(function(proj){
      console.log("Project data: ", proj.data);
      var newProject = {};
      newProject.id = proj.data._id;
      newProject.name = proj.data.name;
      $scope.allProjects.push(newProject);
      console.log("Updated allProjects Array: ", $scope.allProjects);
    });
    $scope.project = {};
  };
  
  $scope.renderProjView = function(id){
    console.log(id);
    Proj.fetchAllProjectTasks(id)
      .then(function(tasks){
        $scope.allTasks = tasks;
      });
    Proj.fetchProjectMembers(id)
      .then(function(members){
        $scope.members = members;
      });
  };
  ////////////////////////////////////

  //function to get all existed tasks from db
  $scope.getData = function(){
    $scope.all = $scope.getUserTasks({user: $scope.uID});
    $scope.all.then(function(resp){
      console.log(resp)
      $scope.allTasks = resp;
    })
  }
    //initial function call
    $scope.getData();


  $scope.onSubmit = function(input){
      //console.log(Auth.currUser.user.id);
    $scope.send = {
      	name: input,
      	createdAt: new Date(),
      	completed: false,
        owner:$scope.uID
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
