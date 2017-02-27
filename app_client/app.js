angular.module('soundcloud', ['ngRoute', 'ngMessages', 'ui.bootstrap']);

angular.module('soundcloud').config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './templates/auth.html',
      controller: 'authCtrl'
    })
    .otherwise('/')
})

// protect the profile route from unauthenticated users
// angular.module('soundcloud').run(function($rootScope, $location, authFactory) {
//   $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
//     if ($location.path() === '/profile' && !authFactory.isLoggedIn()) {
//       $location.path('/');
//     }
//   });
// })
