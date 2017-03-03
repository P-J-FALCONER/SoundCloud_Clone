angular.module('soundcloud')
  .controller('topChartCtrl', ['$scope', '$rootScope', 'contentFactory', '$location', function($scope, $rootScope, contentFactory, $location){
     contentFactory.getSongs().then(function(res){
       $scope.songs = res.data;

       var trackPaths = [];
       var songNames = [];
       var song_ids = [];

       for (var i = 0; i < $scope.songs.length; i++) {
         trackPaths.push($scope.songs[i].audio)
         songNames.push($scope.songs[i].name);
         song_ids.push($scope.songs[i]._id);
       }
       $rootScope.$emit('addTop50', {
         songs: trackPaths,
         names: songNames,
         song_ids: song_ids
       });
     });

     $scope.play = function(song){
       $rootScope.$emit('trackPlay', {
         song: song
       });
       var update = $rootScope.$on('updateDOM', function(event, data){
         $scope.songs[data.index].plays += 1;
         update()
       });
     }
  }])
