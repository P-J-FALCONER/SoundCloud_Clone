angular.module('soundcloud')
  .controller('authCtrl', ['$scope', '$cacheFactory', 'authFactory', '$location', function($scope, $cacheFactory, authFactory, $location){
    $scope.register = function(){
      authFactory.register({
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }).then(function(user){
        $location.url('/stream')
      }).catch(function(err){
        console.log(err);
      })
    }

    $scope.login = function(){
      authFactory.login({
        email: $scope.login_email,
        password: $scope.login_password
      }).then(function(user){
        $location.url('/stream')
      }).catch(function(err){
        console.log(err);
        $scope.authFail = 'Incorrect, try again!'
      })
    }

    $scope.logout = function(){
      authFactory.logout();
      $cacheFactory.remove('user')
      $location.url('/login');
    }
  }])
