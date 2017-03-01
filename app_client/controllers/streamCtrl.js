angular.module('soundcloud')
  .controller('streamCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    $scope.users = [];
    contentFactory.getUsers().then(function(res){
      $scope.users = res.data
    })
    $scope.follow = function(id, index){
      console.log(index);
      console.log(id);
      contentFactory.followUser(id).then(function(res){
        $scope.users.splice(index, 1);
      })
    }
  }])