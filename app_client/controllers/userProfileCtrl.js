angular.module('soundcloud')
  .controller('userProfileCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    contentFactory.getCurrentUser().then(function(response){
      if('google' in response.data){
        $scope.user = response.data.google.username;
        $scope.isLoggedIn = true;
      } else if('local' in response.data){
        $scope.user = response.data.local.username;
        $scope.isLoggedIn = true;
      }
    }).catch(function(err){
      console.log(err);
    })

  }])