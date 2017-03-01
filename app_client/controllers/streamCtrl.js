angular.module('soundcloud')
  .controller('streamCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    $scope.users = [];
    contentFactory.getUsers().then(function(res){
      console.log(res.data)
      $scope.users = res.data
    })
  }])