angular.module('soundcloud')
  .controller('authCtrl', ['$scope', '$rootScope', '$cacheFactory', 'authFactory', '$location', function($scope, $rootScope, $cacheFactory, authFactory, $location){
    $scope.register = function(){
      authFactory.register({
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }).then(function(user){
        $rootScope.$emit('authorized', {'user': user})
        $location.url('/stream')
      }).catch(function(err){
        $scope.error = err
        console.log(err);
      })
    }

    $scope.login = function(){
      authFactory.login({
        email: $scope.login_email,
        password: $scope.login_password
      }).then(function(user){
        $rootScope.$emit('authorized', {'user': user})
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
