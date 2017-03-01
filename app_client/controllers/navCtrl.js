angular.module('soundcloud')
  .controller('navCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
    $scope.isCollapsed = true;
    $scope.isCollapsed2 = true;

    authFactory.getCurrentUser().then(function(response){
      if(response.data){
        $scope.auth_username = response.data.username;
        $scope.isLoggedIn = true;
        $scope.userimage = response.data.image;
      }
    }).catch(function(err){
      console.log(err);
    })

    $scope.logout = function(){
      authFactory.logout()
        .then(function(response){
          $scope.isLoggedIn = false;
          $location.url('/')
        })
        .catch(function(response){
          console.log(response.data);
        })
    }
  }]);
