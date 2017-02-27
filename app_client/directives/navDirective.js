(function () {
  angular
    .module('soundcloud')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '../views/navigation.html',
      controller: 'navCtrl as navvm'
    };
  }

})();
