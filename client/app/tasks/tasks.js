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

  //initially set current group to general tasks and change as other project links are clicked
  $window.localStorage.setItem('proj.name.fridge', 'All Tasks');
  $window.localStorage.setItem('proj.id.fridge', undefined);
  
  $scope.$watch('currentProjectName', function(newVal, oldVal){
    $scope.projNameDisplay = $scope.name;
  });
  //new project container that is sent to server when user presses enter in 'Add New Proj' input form
  $scope.project = {};
  //all members of a project. loaded and populated whenever a project link is clicked
  $scope.members = [];
  //array of all projects, which is formatted as a list in sidebar
  $scope.allProjects = [];

  //add new project to sidebar list and to db
  $scope.addProject = function(){
    Proj.addProject($scope.project, $scope.cUser)
    .then(function(proj){
      $scope.allProjects.push(proj.data);
    });
    //resets input form to be blank after submission
    $scope.project = {};
  };

  //function to populate sidebar task list when page is loaded
  $scope.loadProjList = function(){
    Proj.getUserProjectsList($scope.cUser)
      .then(function(projList){
        $scope.allProjects = projList.data;
      })
  };
  //func is called as soon as page loads
  $scope.loadProjList();

  //this function called whenever a project link is clicked in sidebar list
  $scope.renderProjView = function(id, name){
    $window.localStorage.setItem('proj.name.fridge', name);
    $window.localStorage.setItem('proj.id.fridge', id);
    console.log("render name: ", $window.localStorage.getItem('proj.name.fridge'));

    //first thing to do when a project link is clicked is to clear out tasks in
    //$scope.allTasks and replace with tasks of clicked project
    $scope.allTasks = [];

    //it will fetch the tasks and the group members of the project link clicked
    Proj.fetchAllProjectTasks(id)
      .then(function(tasks){
        //subsequently, the $scope.tasks array will be populated with the tasks of
        //the specified group
        $scope.allTasks = tasks;
      });
    Proj.fetchProjectMembers(id)
      .then(function(members){
        //$scope.members will be populated with members of group
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


  $scope.addTask = function(input){
    var projID = $window.localStorage.getItem('proj.id.fridge');
    var taskData = {
    	name: input,
    	createdAt: new Date(),
      group: projID,
    	completed: false,
      owner:$scope.uID
    };
    Tasks.addTask(taskData)
      .then(function(task){
        //update task list with most recently added task
        $scope.allTasks.push(task.data)
        //clear input after task has been added
        $scope.input = null;
        // //update task list
        // $scope.getData();
      });
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
