(function () {
  angular
    .module('soundcloud')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '../templates/navigation.html',
      controller: 'navCtrl as navvm'
    };
  }

})();
