(function () {

  angular
    .module('soundcloud')
    .controller('deleteModalCtrl', deleteModalCtrl);

  deleteModalCtrl.$inject = ['$scope', '$uibModalInstance', '$location', 'contentFactory'];
  function deleteModalCtrl ($scope, $uibModalInstance, $location, contentFactory) {
    $scope.deleteUser = function(){
      contentFactory.deleteUser().then(function(){
        $location.url('/')
      }).catch(function(err){
        console.log(err);
      })
    }

    $scope.modal = {
      close : function (result) {
        $uibModalInstance.close(result);
      },
      cancel : function () {
        $uibModalInstance.dismiss('cancel');
      }
    };
  }
})();
