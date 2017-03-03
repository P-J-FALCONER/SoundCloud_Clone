angular.module('soundcloud')
  .controller('uploadCtrl', ['$http', '$timeout', '$scope', 'contentFactory', '$location', 'Upload', function($http, $timeout, $scope, contentFactory, $location, Upload){
    $scope.uploadFile = function(form){
      console.log($scope.audioFile);
      console.log($scope.name);
      console.log($scope.image);
      Upload.upload({
            url: '/api/audio',
            method: 'post',
            data: {
              file: $scope.audioFile,
              name: $scope.name,
              image: $scope.image
            }
        }).then(function (resp) {
            $scope.success = true;
            $timeout(function() {
              // Loadind done here - Show message for 3 more seconds.
              $timeout(function() {
                $scope.success = false;
                $scope.name = '';
                $scope.image = '';
                $scope.audioFile ='';
                form.$setSubmitted(false);
                form.$setPristine();
                form.$setUntouched();
              }, 1000);
            }, 2000);

            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        })
    }
  }])
