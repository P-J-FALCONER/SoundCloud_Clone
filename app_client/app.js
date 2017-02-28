angular.module('soundcloud', ['ngRoute', 'ngMessages', 'ui.bootstrap', 'ngFileUpload']);

angular.module('soundcloud').config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './templates/auth.html',
      controller: 'authCtrl'
    }).when('/user',{
      templateUrl:'./templates/userProfile.html',
      controller:'userProfileCtrl'
    }).when('/upload',{
      templateUrl:'./templates/upload.html',
      controller:'uploadCtrl'
    }).when('/collections',{
      templateUrl: './templates/collections.html',
      controller: 'collectionsCtrl'
    }).when('/stream',{
      templateUrl: './templates/stream.html',
      controller: 'streamCtrl'
    }).when('/topchart',{
      templateUrl: './templates/topChart.html',
      controller:'topChartCtrl'
    }).otherwise('/')
})
