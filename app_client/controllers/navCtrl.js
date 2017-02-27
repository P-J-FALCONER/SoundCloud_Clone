(function () {

  angular
    .module('soundcloud')
    .controller('navCtrl', navCtrl);

  navCtrl.$inject = ['$location', 'authFactory'];
  function navCtrl($location, authFactory) {
    var vm = this;

    vm.currentPath = $location.path();

    vm.isLoggedIn = authFactory.isLoggedIn();

    vm.currentUser = authFactory.currentUser();

    vm.logout = function() {
      authFactory.logout();
      $location.path('/');
    };

  }
})();
