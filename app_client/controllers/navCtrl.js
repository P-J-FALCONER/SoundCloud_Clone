angular.module('soundcloud')
  .controller('navCtrl', ['$rootScope', '$scope', '$cacheFactory', 'authFactory', '$location', function($rootScope, $scope, $cacheFactory, authFactory, $location){
    $scope.isCollapsed = true;
    $scope.isCollapsed2 = true;

    if(angular.isUndefined($cacheFactory.get('userCache'))){
      $cacheFactory('userCache')
    }

    if($cacheFactory.get('userCache').get('user')){
      $scope.user = $cacheFactory.get('userCache').get('user');
      $scope.isLoggedIn = true;
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
          $cacheFactory.get('userCache').remove('user')
          $scope.isLoggedIn = false;
          $rootScope.$emit('loggedOut');
          $location.url('/')
        })
        .catch(function(err){
          console.log(err);
        })
    }
  }]);
