angular.module('soundcloud')
  .controller('userProfileCtrl', ['$scope','contentFactory', '$location', function($scope, contentFactory, $location){
    contentFactory.getAggregateStats().then(function(stats){
      console.log(stats);
    }).catch(function(err){
      console.log(err);
    })
  }])
