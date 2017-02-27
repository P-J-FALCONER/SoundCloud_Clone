angular.module('soundcloud', ['ngRoute', 'ngMessages', 'ui.bootstrap']);

angular.module('soundcloud').config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './templates/auth.html',
      controller: 'authCtrl'
    }).when('/user',{
      templateUrl:'./templates/userProfile.html',
      controller:'userProfileCtrl'
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