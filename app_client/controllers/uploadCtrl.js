angular.module('soundcloud')
  .controller('uploadCtrl', ['$http','$scope','contentFactory', '$location', function($http, $scope, contentFactory, $location){
    $scope.add = function(files){
      // console.log(files);
      // var fd = new FormData();
      // fd.append("file", files[0]);
      //
      // console.log(fd);
      //
      // $http({
      //     method: 'POST',
      //     url: 'api/audio',
      //     data: fd,
      //     headers: {'Content-Type': undefined },
      //     transformRequest: angular.identity
      // }).then(function(result){
      //   console.log('...all right!...');
      // }).catch(function(err){
      //   console.log('..damn!...');
      // })
      r = new FileReader();
      console.log(files[0]);
      r.onloadend = function(e){
        var data = e.target.result;
        console.log(data);
        //send your binary data via $http or $resource or do anything else with it
      }
      r.readAsBinaryString(files[0]);
    }
  }])
