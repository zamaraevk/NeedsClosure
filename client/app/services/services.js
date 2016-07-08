angular.module('fridge.services', [])

.controller('Tasks', function($http){
  var fetchAllTasks = function(){
    return $http({
      method: 'GET',
      url: '/api/tasks'
    }).then(function(resp){
      return resp.data;
    })
  };

  var addTask = function(task){
    return $http({
      method: 'POST',
      url: '/api/tasks',
      data: link
    }).then(function(resp){
      console.log('Task Successfully Added.');
    })
  };

  var deleteTask = function(task){
    return $http({
      method: 'DELETE',
      url: '/api/tasks',
      data: task
    }).then(function(resp){
      console.log('Task Successfully Deleted.');
    })
  };

  var completeTask = function(task){
    return $http({
      method: 'PUT',
      url: '/api/tasks',
      data: task
    })
  }

})

.factory('Auth', function ($http, $location, $window) {
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.shortly');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.shortly');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
