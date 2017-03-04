angular.module('soundcloud')
  .controller('streamCtrl', ['$scope','contentFactory', '$location','$cacheFactory','authFactory','$rootScope', function($scope, contentFactory, $location, $cacheFactory, authFactory, $rootScope){
    $scope.users = [];
    $scope.likeIndex = [];
    $scope.showComments = false;

    $scope.init = function(){
      contentFactory.getUsers().then(function(res){
        $scope.users = res.data
      })
      contentFactory.getComments().then(function(response){
        $scope.comments = response.data
      })
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
    }

    $scope.init()


    $scope.follow = function(id, index){
      contentFactory.followUser(id).then(function(res){
        $scope.users.splice(index, 1)
        contentFactory.getArtistSongs(id).then(function(response){
          $scope.init();
        })
      })
    }



    $scope.likeSong = function(song_id, index){
      contentFactory.likeSong(song_id).then(function(response){
        $scope.streamSongs[index].userLikes.push($scope.user._id);
      })
    }

    $scope.$on('currentTime', function(event, data) {
      $scope.time= data.time;
    })

    $scope.makeComment = function(song_id, songComment){
      console.log('in make comment');
      $rootScope.$emit('requestTime', {
        song_id: song_id,
        songComment: songComment
      });
      $scope.showComments = true;
    }

    $rootScope.$on('currentTime', function(event,data){
      var time = data;
      contentFactory.comment(time.song_id, time.songComment, time.seconds).then(function(response){
        response.data.username = $scope.user.username
        $scope.comments.push(response.data)
      })
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
