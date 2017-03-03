angular.module('soundcloud')
  .controller('userProfileCtrl', ['$scope','$rootScope', 'contentFactory', '$location', function($scope, $rootScope, contentFactory, $location){
    contentFactory.getAggregateStats().then(function(stats){
      $scope.stats = stats.data;
    }).catch(function(err){
      console.log(err);
    })
    $scope.delete = function(){
      contentFactory.deleteUser().then(function(res){
        $location.url('/')
      })
    }
    $scope.updateUserImage = function(){
      contentFactory.updateUserImage({image:$scope.image}).then(function(user){
        var authorized = $rootScope.$emit('authorized', {'user': user})
      }).catch(function(err){
        console.log(err);
      })
    }
  }])
