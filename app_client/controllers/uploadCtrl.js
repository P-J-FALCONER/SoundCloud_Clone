angular.module('soundcloud')
  .controller('uploadCtrl', ['$http', '$scope', 'contentFactory', '$location', 'Upload', function($http, $scope, contentFactory, $location, Upload){
    $scope.uploadFile = function(){
      console.log($scope.audioFile);
      Upload.upload({
            url: '/api/audio',
            method: 'post',
            data: {
              file: $scope.audioFile,
              name: $scope.name
            }
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    }
  }])
