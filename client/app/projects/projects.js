angular.module('app.projects', [])

.controller('ProjController', function($scope, Proj){
  $scope.newProject = {};
  $scope.addNewProj = function(){
    Proj.addProject($scope.newProject);
  };
})

.directive('projectTabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: ['projTabsCtrl', function($scope) {
      var projects = $scope.projects = [];

      $scope.select = function(project) {
        angular.forEach(projects, function(project) {
          project.selected = false;
        });
        project.selected = true;
      };

      this.addProject = function(project) {
        if (projects.length === 0) {
          $scope.select(project);
        }
        projects.push(project);
      };
    }],
    templateUrl: 'app/projects/project-tabs.html'
  };
})

.directive('projectView', function() {
  return {
    require: '^^projectTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addProject(scope);
    },
    templateUrl: 'app/projects/project.html'
  };
})

// .factory('Proj', function(){
//
//   //function to add project to projects list in index.html sidebar
//     //send POST request to server with the name of the new project that is entered
//     //in input field
//
//
//   //POST request to add task to db
//
//   //GET request to search for usernames
//
//   //POST request to add new project category to db
//
//
//   return {
//
//   }
// })
