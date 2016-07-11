angular.module('fridge', [
  'tasks',
  'services',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: 'app/tasks/tasks.html',
      controller: 'TasksController'
    });
})

//THE COMMENTED CODE BELOW WILL BE USED FOR ATTACHING TOKENS TO EACH
//USER SESSION

// .factory('AttachTokens', function ($window) {
//   var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.shortly');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })
// .run(function ($rootScope, $location, Auth) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/signin');
//     }
//   });
// });
