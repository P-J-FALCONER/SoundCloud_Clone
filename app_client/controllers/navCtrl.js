angular.module('soundcloud')
  .controller('navCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
    $scope.currentPath = $location.path();

    authFactory.getCurrentUser().then(function(response){
      if(response.data == ''){
        $scope.user = '';
        $scope.isLoggedIn = false;
      } else {
        console.log(response);
        $scope.user = response.data.username;
        $scope.isLoggedIn = true;
      }
    }).catch(function(err){
      console.log(err);
    })

    $scope.logout = function(){
      authFactory.logout()
        .then(function(response){
          $scope.user = '';
        })
        .catch(function(response){
          console.log(response.data);
        })
    }
  }]);
