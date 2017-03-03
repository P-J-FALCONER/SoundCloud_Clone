(function () {

  angular
    .module('soundcloud')
    .controller('deleteModalCtrl', deleteModalCtrl);

  deleteModalCtrl.$inject = ['$rootScope', '$scope', '$uibModalInstance', '$location', 'contentFactory'];
  function deleteModalCtrl ($rootScope, $scope, $uibModalInstance, $location, contentFactory) {
    $scope.deleteUser = function(){
      contentFactory.deleteUser().then(function(){
        $scope.modal.close();
        console.log('send emit');
        $rootScope.$emit('logout')
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
