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
      activetab:'collection'
    }).when('/stream',{
      templateUrl: './templates/stream.html',
      controller: 'streamCtrl',
      activetab:'stream'
    }).when('/topchart',{
      templateUrl: './templates/topChart.html',
      controller:'topChartCtrl',
      activetab:'topchart'
    }).otherwise('/')
})