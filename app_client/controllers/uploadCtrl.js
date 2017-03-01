angular.module('soundcloud')
  .controller('uploadCtrl', ['$http', '$scope', 'contentFactory', '$location', 'Upload', function($http, $scope, contentFactory, $location, Upload){
    $scope.uploadFile = function(){
      Upload.upload({
            url: '/api/audio',
            method: 'post',
            data: {
              file: $scope.audioFile,
              name: $scope.name,
              image: $scope.image
            }
        }).then(function (resp) {
            $scope.success = 'File uploaded'
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        })
    }
  }])
