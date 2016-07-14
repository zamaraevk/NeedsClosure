angular.module('services', [])

.factory('Tasks', function ($http) {

  var getUserTasks = function(user){
      return $http({
        method: 'POST',
        url: '/api/usertasks',
        data: user
      }).then(function(resp){
        console.log(resp.data);
        return resp.data;
      })
    };

    var fetchAllTasks = function(){
        return $http({
          method: 'GET',
          url: '/api/tasks'
        }).then(function(resp){
          return resp.data;
        })
      };

  var addTask = function(task, callback){
    console.log('working', task);
    return $http({
      method: 'POST',
      url: '/api/tasks',
      data: task
    }).then(function(resp){
      //using callback to update our tasks ONLY after respond
      callback(resp);
    })
  };


  var deleteTask = function(task, callback){
     return $http({
       method: 'POST',
       url: '/api/tasks/delete',
       data: JSON.stringify(task)
     }).then(function(resp){
       //using callback to update our tasks ONLY after respond
       callback(resp);
     }).catch(function(err){
       console.log('Error', err);
     })
   };

   var completeTask = function(task, callback){
       return $http({
         method: 'PUT',
         url: '/api/tasks',
         data: task
       }).then(function(resp){
         //using callback to update our tasks ONLY after respond
         callback(resp);
       }).catch(function(err){
         console.log('Error', err);
       })
     }


  return {
    fetchAllTasks:fetchAllTasks,
    getUserTasks:getUserTasks,
    addTask: addTask,
    deleteTask:deleteTask,
    completeTask: completeTask
  }

})

.factory('Auth', function ($http, $location, $window) {
  var currUser = {user: null}
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signin',
      data: user
    })
    .then(function (resp) {
      console.log("user object from backend",resp.data);
      currUser.user = resp.data.user;
      return resp.data;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.fridge');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.fridge');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout,
    currUser: currUser
  };
});
