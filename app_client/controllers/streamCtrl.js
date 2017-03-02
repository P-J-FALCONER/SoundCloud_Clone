angular.module('soundcloud')
  .controller('streamCtrl', ['$scope','contentFactory', '$location','$cacheFactory','authFactory', function($scope, contentFactory, $location, $cacheFactory, authFactory){
    $scope.users = [];
    $scope.likeIndex = [];
    contentFactory.getUsers().then(function(res){
      $scope.users = res.data
    })
    $scope.follow = function(id, index){
      contentFactory.followUser(id).then(function(res){
        $scope.users.splice(index, 1);
      })
    }
    contentFactory.getStreamSongs().then(function(response){
      $scope.streamSongs= response.data
    })
    contentFactory.getStreamAlbums().then(function(response){
      $scope.streamAlbums= response.data
    })
    $scope.likeSong = function(song_id, index){
      contentFactory.likeSong(song_id).then(function(response){
        $scope.streamSongs[index].userLikes.push($scope.user._id);
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
  }])