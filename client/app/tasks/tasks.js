angular.module('tasks', [])

.controller('TasksController', function($scope, Tasks){

  angular.extend($scope, Tasks);
  //will be submitted to server in POST request body containing the new task input data
    //when ready to send requests to server, add "Tasks" controller as function input variable
  $scope.allTasks = [];
  var x = $scope.fetchAllTasks();
  console.log(x);
  $scope.onSubmit = function(input){
    console.log(input);
    $scope.send = {
      	name: input,
      	createdAt: new Date(),
      	completed: false
      };
    $scope.addTask($scope.send);
  }
})

//The below directive is supposed to enable the submission of text from an input
//field to be achived with the "Enter" keyPress

// .directive('myEnter', function () {
//     return function (scope, element, attrs) {
//         element.bind("keydown keypress", function (event) {
//             if(event.which === 13) {
//                 scope.$apply(function (){
//                     scope.$eval(attrs.myEnter);
//                 });
//
//                 event.preventDefault();
//             }
//         });
//     };
// });

//Another option for the above mentioned "Enter" keyPress submission

// $('input').keypress(function (e) {
//     if (e.which === 13) {
//       window.visitor = 'guest';
//       if (!streams.users[window.visitor]) {
//         streams.users[window.visitor] = [];
//       }
//       writeTweet($(this).val());
//       $(this).val('');
//       printTweets('all');
//     }
//   });
