angular.module('soundcloud')
  .controller('userProfileCtrl', ['$scope','$rootScope', 'contentFactory', '$location', '$uibModal', function($scope, $rootScope, contentFactory, $location, $uibModal){
    contentFactory.getAggregateStats().then(function(stats){
      $scope.stats = stats.data;
    }).catch(function(err){
      console.log(err);
    })
    $scope.delete = function(){
      contentFactory.deleteUser().then(function(res){
        $location.url('/')
      })
    }
    $scope.updateUserImage = function(){
      contentFactory.updateUserImage({image:$scope.image}).then(function(user){
        var authorized = $rootScope.$emit('authorized', {'user': user})
      }).catch(function(err){
        console.log(err);
      })
    }

    $scope.popupDeleteForm = function () {
      var modalInstance = $uibModal.open({
        templateUrl: '/templates/deleteModal.html',
        controller: 'deleteModalCtrl'
        // resolve : {
        //   locationData : function () {
        //     return {
        //       locationid : vm.locationid,
        //       locationName : vm.data.location.name
        //     };
        //   }
        // }
      });

      modalInstance.result.then(function (data) {
        $location.url('/')
      });
    };
  }])
