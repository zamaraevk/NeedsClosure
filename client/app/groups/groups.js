angular.module('groups', [])

.controller('GroupController', function($scope, $window, Tasks, Auth, Proj){

  angular.extend($scope, Tasks, Auth);

})
