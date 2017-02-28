angular.module('soundcloud')
  .controller('navCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
    $scope.currentPath = $location.path();
    $scope.isNavCollapsed = true;
    $scope.isCollapsed = false;
    $scope.isCollapsedHorizontal = false;
    authFactory.getCurrentUser().then(function(response){
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

    $scope.logout = function(){
      authFactory.logout()
        .then(function(response){
          $scope.user = '';
          $location.url('/')
        })
        .catch(function(response){
          console.log(response.data);
        })
    }
  }]);
