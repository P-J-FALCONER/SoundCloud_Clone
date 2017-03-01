angular.module('soundcloud')
  .controller('topChartCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    $scope.songs=[];
   contentFactory.getSongs().then(function(res){
     console.log(res.data);
     $scope.songs = res.data;
   });

  }])
