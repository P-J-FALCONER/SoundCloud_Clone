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

    $scope.intervals = [];

    $scope.currentIndex = 0

    $scope.currentTime = 0;

    $scope.seconds = 0;

    $scope.reset = function(){
      $scope.currentTime = 0;
      $scope.seconds = 0;
      $scope.elapsed = '0%'
    }

    $scope.clearIntervals = function(){
      angular.forEach($scope.intervals, function(interval) {
        $interval.cancel(interval);
      });
    }

    $scope.play = function () {
      if(!$scope.trackList){
        return false;
      }
      audioFactory.src = $scope.trackList[$scope.currentIndex];
      if(audioFactory.src){
        audioFactory.currentTime = $scope.currentTime
        audioFactory.play();
      }
      $scope.intervals.push($interval(function(){
        $scope.isPaused = false;
        if(audioFactory.duration > $scope.seconds && !$scope.isPaused){
          $scope.seconds += 1;
          $scope.elapsed = ($scope.seconds / audioFactory.duration)* 100 + '%';
        } else {
          $scope.clearIntervals()
          if($scope.isPaused){
            $scope.currentTime = $scope.seconds;
            return false;
          }
          $scope.currentIndex++;
          if(audioFactory.duration < $scope.seconds){
            $scope.reset()
            if($scope.trackList.length > $scope.currentIndex){
              $scope.play()
            } else {
              $scope.currentIndex = 0;
            }
          }
        }
      }, 1000))

    }

    $scope.pause = function () {
      $scope.currentTime = $scope.seconds;
      $scope.isPaused = true;
      $scope.clearIntervals();
      audioFactory.pause();
    }

    $scope.previous = function () {
      $scope.reset();
      $scope.clearIntervals();
      if ($scope.currentIndex > 0) {
          $scope.currentIndex--;
          $scope.play();
      }
    }
    $scope.currentTime = audioFactory.currentTime;

    $scope.next = function () {
      $scope.reset();
      $scope.clearIntervals();
      if ($scope.currentIndex < $scope.trackList.length) {
        $scope.currentIndex++;
        $scope.play();
      }
    }

    $rootScope.$on('addTop50', function(event, data) {
      $scope.trackList = data.songs
    });

    $rootScope.$on('trackPlay', function(event, data) {
      $scope.reset();
      var trackIndex = $scope.trackList.indexOf(data.song.audio);
      $scope.currentIndex = trackIndex;
      $scope.play()
    });

  }
})();
