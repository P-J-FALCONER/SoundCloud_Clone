angular.module('soundcloud')
  .controller('topChartCtrl', ['$scope', '$rootScope', 'contentFactory', '$location', function($scope, $rootScope, contentFactory, $location){
     contentFactory.getSongs().then(function(res){
       $scope.songs = res.data;

       var trackPaths = [];
       for (var i = 0; i < $scope.songs.length; i++) {
         trackPaths.push($scope.songs[i].audio)
       }
       $rootScope.$emit('addTop50', {
         songs: trackPaths
       });
     });

     $scope.play = function(song){
       $rootScope.$emit('trackPlay', {
         song: song
       });
     }
  }])
