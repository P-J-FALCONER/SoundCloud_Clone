(function () {

  angular
    .module('soundcloud')
    .controller('musicPlayerCtrl', musicPlayerCtrl);

  musicPlayerCtrl.$inject = ['$scope', '$rootScope', '$location', 'authFactory', '$cacheFactory', 'audioFactory', '$interval'];
  function musicPlayerCtrl($scope, $rootScope, $location, authFactory, $cacheFactory, audioFactory, $interval) {
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

    $scope.isPaused = true

    $scope.trackList = [];

    $scope.currentIndex = 0

    $scope.seconds = 0;

    $scope.play = function () {
      $scope.isPaused = false;
      audioFactory.src = $scope.trackList[$scope.currentIndex];
      if(audioFactory.src){
        audioFactory.play();
      }
      var timer = $interval(function(){
        if(audioFactory.duration > $scope.seconds && !audioFactory.paused){
          $scope.seconds += 1;
          console.log($scope.seconds, audioFactory.duration);
        } else {
          console.log('cancelled timer');
          $scope.currentIndex++;
          $interval.cancel(timer);
          $scope.seconds = 0;
          if($scope.trackList.length > $scope.currentIndex){
            console.log('lets keep this party going!');
            $scope.play()
          } else {
            console.log('lets start this thang over');
            currentIndex = 0;
          }
        }
      }, 1000)
    }

    $scope.pause = function () {
      $scope.isPaused = !$scope.isPaused;
      if ($scope.isPaused) {
          audioFactory.pause();
      } else {
          audioFactory.play();
      }
    }

    $scope.previous = function () {
      if ($scope.currentIndex > 0) {
          $scope.currentIndex--;
          $scope.play();
      }
    }
    $scope.currentTime = audioFactory.currentTime;

    $scope.next = function () {
      if ($scope.currentIndex < myPlayer.trackList.length) {
          $scope.currentIndex++;
          $scope.play();
      }
    }

    $rootScope.$on('loggedOut', function(event, data) {
      console.log('logged out');
      $scope.user = '';
      player.stop()
    });

    $rootScope.$on('addTop50', function(event, data) {
      console.log(data);
      $scope.trackList = data.songs
      console.log($scope.trackList);
      console.log($scope.currentIndex);
    });

    $rootScope.$on('trackPlay', function(event, data) {
      var trackIndex = $scope.trackList.indexOf(data.song.audio);
      console.log(trackIndex);
      $scope.currentIndex = trackIndex;
      $scope.play()
    });

  }
})();
