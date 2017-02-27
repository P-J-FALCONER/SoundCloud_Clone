(function () {

  angular
    .module('soundcloud')
    .controller('musicPlayerCtrl', musicPlayerCtrl);

  musicPlayerCtrl.$inject = ['$location', 'authFactory'];
  function musicPlayerCtrl($location, authFactory) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authFactory.isLoggedIn();

    vm.currentUser = authFactory.currentUser();

  }
})();
