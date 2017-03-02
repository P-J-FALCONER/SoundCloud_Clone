angular.module('soundcloud')
  .controller('collectionCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    contentFactory.getFollowing().then(function(response){
      $scope.following = response.data.following;
    })
    contentFactory.getUserLikedSongs().then(function(response){
      console.log('SONG RESPONSE', response.data);
      $scope.liked_songs = response.data;
    })
    contentFactory.getUserLikedAlbums().then(function(response){
      console.log('ALBUM RESPONSE', response.data);
      $scope.liked_albums = response.data;
    })
  }])