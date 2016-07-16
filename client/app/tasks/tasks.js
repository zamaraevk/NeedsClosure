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
  // $scope.currentProjectID;
  // $scope.currentProjectName;
  $scope.$watch('currentProjectName', function(newVal, oldVal){
    $scope.projNameDisplay = $scope.name;
  });
  //new project to be sent to server
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
    $scope.currentProjectID = id;
    $scope.currentProjectName = name;
    console.log("Curr proj ID: ", $scope.currentProjectID);
    console.log("Curr proj Name: ", $scope.currentProjectName);
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
    console.log("addtask- Curr proj ID: ", $scope.currentProjectID);
    console.log("addtask- Curr proj Name: ", $scope.currentProjectName);
    $scope.taskData = {
    	name: input,
    	createdAt: new Date(),
      group: $scope.currentProjectID,
    	completed: false,
      owner:$scope.uID
    };
    Tasks.addTask($scope.taskData)
      .then(function(resp){
        console.log("Response from add task: ", resp);
        //clear input after task has been added
        $scope.input = null;
        //update task list
        $scope.getData();
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
