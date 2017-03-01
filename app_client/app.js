angular.module('soundcloud', ['ngRoute', 'ngMessages', 'ui.bootstrap', 'ngFileUpload']);

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
    }).when('/artist/:id',{
      templateUrl: './templates/artist.html',
      controller:'artistCtrl',
      activetab:'artist'
    }).otherwise('/')
})

angular.module('soundcloud').run(function($rootScope, $location, authFactory, $cacheFactory) {
  $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
    if ($location.path() === '/user'){
      authFactory.getCurrentUser().then(function(user){
        if(user.data == ''){
          $location.path('/');
        }
        var cache = $cacheFactory('userCache')
        cache.put('user', user.data)
      })
    }
  });
})
