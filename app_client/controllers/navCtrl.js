angular.module('soundcloud')
  .controller('navCtrl', ['$rootScope', '$scope', '$cacheFactory', 'authFactory', '$location', function($rootScope, $scope, $cacheFactory, authFactory, $location){
    $scope.isCollapsed = true;
    $scope.isCollapsed2 = true;

    if(angular.isUndefined($cacheFactory.get('userCache'))){
      $cacheFactory('userCache')
    }

    $scope.authorizeUser = function(user){
      if(user){
        $scope.user = user.data
        $cacheFactory.get('userCache').put('user', user.data)
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
    }

    $scope.authorizeUser();

    $scope.logout = function(){
      authFactory.logout()
        .then(function(response){
          $cacheFactory.get('userCache').remove('user')
          $scope.isLoggedIn = false;
          $location.url('/')
        })
        .catch(function(err){
          console.log(err);
        })
    }

    var authorized = $rootScope.$on('authorized', function(event, data){
      $scope.authorizeUser(data.user);
      authorized();
    })

    var logout = $rootScope.$on('logout', function(event, data){
      $scope.logout();
      logout();
    })
  }]);
