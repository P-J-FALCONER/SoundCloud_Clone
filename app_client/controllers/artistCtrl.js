angular.module('soundcloud')
  .controller('artistCtrl', ['$scope','contentFactory', '$location','$routeParams', function($scope, contentFactory, $location, $routeParams){
    $scope.artist_id = $routeParams.id;
    $scope.artist_songs = [];
    $scope.artist_albums = [];
    $scope.artist_name = '';
    // if id does not exist when we search for username redirect to stream
  }])