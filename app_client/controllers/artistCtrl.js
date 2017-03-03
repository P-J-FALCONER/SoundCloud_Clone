angular.module('soundcloud')
  .controller('artistCtrl', ['$scope','contentFactory', '$location','$routeParams','$cacheFactory','authFactory', function($scope, contentFactory, $location, $routeParams, $cacheFactory, authFactory){
    $scope.artist_id = $routeParams.id;
    $scope.artist_songs = [];
    $scope.artist_albums = [];
    $scope.artist_name = '';
    // if id does not exist when we search for username redirect to stream
    contentFactory.getArtist($scope.artist_id).then(function(response){
      $scope.artist_name = response.data.username
    })
    contentFactory.getArtistSongs($scope.artist_id).then(function(response){
      $scope.artist_songs = response.data;
    })
    contentFactory.getArtistAlbums($scope.artist_id).then(function(response){
      $scope.artist_albums = response.data;
    })
    $scope.likeSong = function(song_id, index){
      contentFactory.likeSong(song_id).then(function(response){
        $scope.artist_songs[index].userLikes.push($scope.user._id);
      })
    }
    if(angular.isUndefined($cacheFactory.get('userCache'))){
      $cacheFactory('userCache')
    }
    if($cacheFactory.get('userCache').get('user')){
      $scope.user = $cacheFactory.get('userCache').get('user');
    } else {
      authFactory.getCurrentUser().then(function(response){
        if(response.data){
          $scope.user = response.data;
        }
      }).catch(function(err){
        console.log(err);
      })
    }
    contentFactory.getComments().then(function(response){
      $scope.comments = response.data
    })
    $scope.makeComment = function(song_id, songComment){
      $rootScope.$emit('requestTime', {
        song_id: song_id,
        songComment: songComment
      });
    }

    var currentTime = $rootScope.$on('currentTime', function(event,data){
      var time = data;
      contentFactory.comment(time.song_id, time.songComment, time.seconds).then(function(response){
        response.data.username = $scope.user.username
        $scope.comments.push(response.data)
      })
      currentTime();
    })
  }])
  .filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])