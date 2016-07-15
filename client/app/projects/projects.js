
.controller('ProjController', function($scope, Proj){

  $scope.newProject = {};

  $scope.addNewProj = function(){
    Proj.addProject($scope.newProject);
  };

})

.factory('Proj', function(){

  //function to add project to projects list in index.html sidebar
    //send POST request to server with the name of the new project that is entered
    //in input field

  return {

  }
})
