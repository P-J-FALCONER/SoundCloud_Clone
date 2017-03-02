angular.module('soundcloud', ['ngRoute', 'ngMessages', 'ui.bootstrap', 'ngFileUpload', 'ngAnimate']);

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
    }).when('/artist/:id',{
      templateUrl: './templates/artist.html',
      controller:'artistCtrl',
      activetab:'artist'
    }).otherwise('/')
})

angular.module('soundcloud').run(function($rootScope, $location, authFactory, $cacheFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    authFactory.getCurrentUser().then(function(user){
      if(angular.isUndefined($cacheFactory.get('userCache'))){
        $cacheFactory('userCache');
      }

      if(angular.isUndefined($cacheFactory.get('userCache').get('user'))){
        $cacheFactory.get('userCache').put('user', user.data);
      }

      if ($location.path() === '/user' || $location.path() === '/upload'){
        if(user.data == ''){
          $location.path('/');
        }
      }
    })
  });
})
