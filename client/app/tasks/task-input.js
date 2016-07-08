angular.module('fridge.taskInput', [])

.controller('TasksController', function($scope, Tasks){
  $scope.task={};
  $scope.data={
    tasks:[]
  };
  $scope.addTask = function(task){
    // Tasks.addTask(task);
    $scope.data.tasks.push(task);
  }

})

directive('myEnter', function () {
    return function ($scope, $element, $attrs) {
        $element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                $scope.$apply(function (){
                    $scope.$eval($attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
