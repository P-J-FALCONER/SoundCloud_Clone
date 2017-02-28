angular.module('soundcloud', ['ngRoute', 'ngMessages', 'ui.bootstrap']);

angular.module('soundcloud').config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './templates/auth.html',
      controller: 'authCtrl',
      activetab: 'auth'
    }).when('/user',{
      templateUrl:'./templates/userProfile.html',
      controller:'userProfileCtrl',
      activetab:'user'
    }).when('/collection',{
      templateUrl: './templates/collection.html',
      controller: 'collectionCtrl',
      activetab:'collection',
      controller:'userProfileCtrl'
    }).when('/upload',{
      templateUrl:'./templates/upload.html',
      controller:'uploadCtrl'
    }).when('/stream',{
      templateUrl: './templates/stream.html',
      controller: 'streamCtrl',
      activetab:'stream'
    }).when('/topchart',{
      templateUrl: './templates/topChart.html',
      controller:'topChartCtrl',
      activetab:'topchart'
    }).when('/artist/:id', {
      emplateUrl: './templates/artist.html',
      controller:'artistCtrl',
      activetab:'artist'
    }).otherwise('/')
})
