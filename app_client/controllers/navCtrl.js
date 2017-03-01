angular.module('soundcloud')
  .controller('navCtrl', ['$scope', '$cacheFactory', 'authFactory', '$location', function($scope, $cacheFactory, authFactory, $location){
    $scope.isCollapsed = true;
    $scope.isCollapsed2 = true;

    var cache = $cacheFactory.get('userCache')
    
    if(cache){
      $scope.user = cache.get('user');
    } else {
      authFactory.getCurrentUser().then(function(response){
        if(response.data){
          $scope.user = response.data;
          $scope.isLoggedIn = true;
        }
      }).catch(function(err){
        console.log(err);
      })
    }

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
