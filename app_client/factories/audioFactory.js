angular.module('soundcloud').factory('audioFactory', function($document) {
  var audio = $document[0].createElement('audio');
  return audio;
});
