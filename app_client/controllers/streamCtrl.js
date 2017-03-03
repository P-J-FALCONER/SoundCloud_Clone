angular.module('soundcloud')
  .controller('streamCtrl', ['$scope','contentFactory', '$location','$cacheFactory','authFactory','$rootScope', function($scope, contentFactory, $location, $cacheFactory, authFactory, $rootScope){
    $scope.users = [];
    $scope.likeIndex = [];
    $scope.showComments = false;
    contentFactory.getUsers().then(function(res){
      $scope.users = res.data
    })

    contentFactory.getComments().then(function(response){
      console.log(response.data);
      $scope.comments = response.data
    })

    $scope.follow = function(id, index){
      contentFactory.followUser(id).then(function(res){
        $scope.users.splice(index, 1);
      })
    }

    contentFactory.getStreamSongs().then(function(response){
      $scope.streamSongs= response.data

      var trackPaths = [];
      var songNames = [];
      var song_ids = [];

      for (var i = 0; i < $scope.streamSongs.length; i++) {
        trackPaths.push($scope.streamSongs[i].audio)
        songNames.push($scope.streamSongs[i].name);
        song_ids.push($scope.streamSongs[i]._id);
      }

      $rootScope.$emit('addStream', {
        songs: trackPaths,
        names: songNames,
        song_ids: song_ids
      });
    })

    contentFactory.getStreamAlbums().then(function(response){
      $scope.streamAlbums= response.data
    })

    $scope.likeSong = function(song_id, index){
      contentFactory.likeSong(song_id).then(function(response){
        $scope.streamSongs[index].userLikes.push($scope.user._id);
      })
    }

    $scope.$on('currentTime', function(event, data) {
      $scope.time= data.time;
    })

    $scope.makeComment = function(song_id, songComment){
      $rootScope.$emit('requestTime', {
        song_id: song_id,
        songComment: songComment
      });
    }

    var currentTime = $rootScope.$on('currentTime', function(event,data){
      console.log('data received from music player',data)
      var time = data;
      contentFactory.comment(time.song_id, time.songComment, time.seconds).then(function(response){
        response.data.user.username = $scope.user.username
        console.log(response.data);
        $scope.comments.push(response.data)
      })
      console.log('killing listener')
      currentTime();
      console.log('killed listener')
    })

    $rootScope.$on('nextTrack', function(event, data){
      $scope.playingSongComments = data
    })
    $scope.play = function(song){
      $scope.playingSongComments = song.name
      $rootScope.$emit('trackPlay', {
        song: song
      });
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
  }])
  .filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])
