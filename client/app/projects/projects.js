angular.module('projects', [])

<<<<<<< HEAD
.controller('ProjController', function($scope, Proj){

  $scope.newProject = {};
  
  $scope.addNewProj = function(){
    Proj.addProject($scope.newProject);
  };

})

=======
.controller('ProjController', function($scope){
 $scope.task = {};
})
>>>>>>> projects
.factory('Proj', function(){

  //function to add project to projects list in index.html sidebar
    //send POST request to server with the name of the new project that is entered
    //in input field

<<<<<<< HEAD
=======
  //POST request to add task to db

  //GET request to search for usernames

  //POST request to add new project category to db

>>>>>>> projects
  return {

  }
})
