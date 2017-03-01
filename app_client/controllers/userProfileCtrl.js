angular.module('soundcloud')
  .controller('userProfileCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    contentFactory.getAggregateStats().then(function(stats){
      console.log(stats);
      $scope.stats = stats.data;
    }).catch(function(err){
      console.log(err);
    })
    $scope.delete = function(){
      contentFactory.deleteUser().then(function(res){
        $location.url('/')
      })
    }
  }])
