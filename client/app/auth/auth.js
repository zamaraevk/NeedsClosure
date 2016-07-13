angular.module('auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.fridge', token);
        $location.path('/tasks');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.fridge', token);
        $location.path('/tasks');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  //When 'logout' is clicked, signout() function removes token from local storage
  //and redirects user to /signin
  $scope.signout = function(){
    Auth.signout();
  };
});
