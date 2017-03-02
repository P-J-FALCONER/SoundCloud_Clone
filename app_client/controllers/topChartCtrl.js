angular.module('soundcloud')
  .controller('topChartCtrl', ['$scope', '$rootScope', 'contentFactory', '$location', function($scope, $rootScope, contentFactory, $location){
     contentFactory.getSongs().then(function(res){
       $scope.songs = res.data;

       var trackPaths = [];
       var songNames = [];

       for (var i = 0; i < $scope.songs.length; i++) {
         trackPaths.push($scope.songs[i].audio)
         songNames.push($scope.songs[i].name);
       }
       $rootScope.$emit('addTop50', {
         songs: trackPaths,
         names: songNames
       });
     });

     $scope.play = function(song){
       $rootScope.$emit('trackPlay', {
         song: song
       });
     }
  }])
