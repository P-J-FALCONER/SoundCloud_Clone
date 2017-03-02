(function () {
  angular
    .module('soundcloud')
    .directive('musicplayer', musicplayer);

  function musicplayer () {
    return {
      restrict: 'EA',
      templateUrl: '../templates/musicPlayer.html',
      controller: 'musicPlayerCtrl'
    };
  }

})();
