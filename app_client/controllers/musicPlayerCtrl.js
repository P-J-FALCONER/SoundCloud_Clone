(function () {

  angular
    .module('soundcloud')
    .controller('musicPlayerCtrl', musicPlayerCtrl);

  musicPlayerCtrl.$inject = ['$scope', '$rootScope', '$location', 'authFactory', '$cacheFactory', 'audioFactory', '$interval', 'contentFactory'];
  function musicPlayerCtrl($scope, $rootScope, $location, authFactory, $cacheFactory, audioFactory, $interval, contentFactory) {
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

    // $scope.currentTrackStatus =

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
      $scope.isPaused = false;
      contentFactory.addPlay($scope.song_ids[$scope.currentIndex]).then(function(updatedSong){
        $rootScope.$emit('updateDOM', {
          index: $scope.currentIndex
        })
      }).catch(function(err){
        console.log(err);
      })

      if(!$scope.trackList){
        return false;
      }
      audioFactory.src = $scope.trackList[$scope.currentIndex];
      if(audioFactory.src){
        audioFactory.currentTime = $scope.currentTime
        audioFactory.play();
      }
      $scope.intervals.push($interval(function(){
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
          $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
          $rootScope.$emit('nextTrack', $scope.currentTrackName)
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

    $rootScope.$on('comment', function(event, data){
      if(data){
        $rootScope.$emit('currentTime', $scope.seconds);
      }
    })

    $scope.pause = function () {
      $scope.isPaused = true;
      $scope.currentTime = $scope.seconds;
      $scope.clearIntervals();
      audioFactory.pause();
    }

    $scope.previous = function () {
      $scope.reset();
      $scope.clearIntervals();
      console.log($scope.currentIndex);
      if ($scope.currentIndex > 0) {
        console.log('executed');
        $scope.currentIndex--;
        $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
        $rootScope.$emit('nextTrack', $scope.currentTrackName)
        $scope.play();
      }
    }
    $scope.currentTime = audioFactory.currentTime;

    $scope.next = function () {
      $scope.reset();
      $scope.clearIntervals();
      if ($scope.currentIndex < $scope.trackList.length - 1) {
        $scope.currentIndex++;
        $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
        $rootScope.$emit('nextTrack', $scope.currentTrackName)
        $scope.play();
      }
    }

    $scope.shaveList = function(){
      console.log($scope.trackList, $scope.trackNames, $scope.song_ids);
      if($scope.trackList.length > 0){
        $scope.trackList = [$scope.trackList[$scope.currentIndex]]
        $scope.trackNames = [$scope.trackNames[$scope.currentIndex]]
        $scope.song_ids = [$scope.song_ids[$scope.currentIndex]]
        $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
      } else {
        $scope.trackList = []
        $scope.trackNames = []
        $scope.song_ids = []
      }
    }

    $rootScope.$on('addTop50', function(event, data) {
      $scope.shaveList()
      $scope.currentIndex = 0;
      $scope.song_ids = ($scope.song_ids).concat(data.song_ids)
      $scope.trackList = ($scope.trackList).concat(data.songs)
      $scope.trackNames = ($scope.trackNames).concat(data.names)
      $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
    });

    $rootScope.$on('addStream', function(event, data) {
      $scope.shaveList()
      $scope.currentIndex = 0;
      $scope.song_ids = ($scope.song_ids).concat(data.song_ids)
      $scope.trackList = ($scope.trackList).concat(data.songs)
      $scope.trackNames = ($scope.trackNames).concat(data.names)
      $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
    });

    $rootScope.$on('trackPlay', function(event, data) {
      $scope.reset();
      var trackIndex = $scope.trackList.indexOf(data.song.audio);
      $scope.currentIndex = trackIndex;
      $scope.currentTrackName = $scope.trackNames[$scope.currentIndex]
      $scope.play()
    });

  }
})();
