angular.module('tasks', [])

.controller('TasksController', function($scope, Tasks){
  //will be submitted to server in POST request body containing the new task input data
  $scope.task={};

  $scope.data={
    //example data
    tasks:[
      {text: "walk dog"},
      {text: "take nap"},
      {text: "go for a run"}
    ]
  }

  $scope.addTask = function(task){
    //make POST request to send new task to database
      //this will be done when backend database is in place

    console.log('Add task worked!');
    $scope.data.tasks.push($scope.task);
    //clear out input field after task has been submitted
    $scope.task = {};
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
