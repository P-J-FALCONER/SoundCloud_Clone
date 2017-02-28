angular.module('soundcloud')
  .controller('authCtrl', ['$scope', 'authFactory', '$location', function($scope, authFactory, $location){
    $scope.register = function(){
      authFactory.register({
        username: $scope.username,
        email: $scope.email,
        password: $scope.password
      }).then(function(user){
        console.log(user);
      }).catch(function(err){
        console.log(err);
      })
    }

    $scope.login = function(){
      authFactory.login({
        email: $scope.login_email,
        password: $scope.login_password
      }).then(function(user){
        console.log(user);
      }).catch(function(err){
        console.log(err);
        $scope.authFail = 'Incorrect, try again!'
      })
    }

    $scope.logout = function(){
      authFactory.logout();
      $location.url('/login');
    }
  }])
