angular.module('soundcloud', ['ngRoute', 'ngMessages']);

angular.module('soundcloud').config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: './views/auth.html',
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
