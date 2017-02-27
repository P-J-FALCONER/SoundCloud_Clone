angular.module('soundcloud')
  .factory('authFactory', ['$http', '$window', function($http, $window){
    return {
      getCurrentUser: function(){
        return $http.get('/api/user');
      },

      logout: function(){
        return $http.delete('/api/user');
      }
  }
  }])
