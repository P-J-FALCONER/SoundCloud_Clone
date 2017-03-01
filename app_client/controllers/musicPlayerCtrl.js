(function () {

  angular
    .module('soundcloud')
    .controller('musicPlayerCtrl', musicPlayerCtrl);

  musicPlayerCtrl.$inject = ['$scope', '$rootScope', '$location', 'authFactory', '$cacheFactory'];
  function musicPlayerCtrl($scope, $rootScope, $location, authFactory, $cacheFactory) {
    var player = angular.element.find("audio");
    console.log(player);

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

    $scope.audioSrc = 'static/audio/pBDPxNpovkI8ApXCTJrkTb3b.mp3'

    $rootScope.$on('loggedOut', function(event, data) {
      console.log('logged out');
      $scope.user = '';
      player.stop()
    });
  }
})();
