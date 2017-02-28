angular.module('soundcloud')
  .controller('topChartCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    $scope.songs=[];
   contentFactory.getSongs().then(function(res){
     $scope.songs = res.data;
   });
  }])
