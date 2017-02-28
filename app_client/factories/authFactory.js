angular.module('soundcloud')
  .factory('authFactory', ['$http', '$window', function($http, $window){
    return {
      getCurrentUser: function(){
        return $http.get('/api/user');
      },
      register: function(obj){
        return $http.post('/register', obj);
      },
      login: function(obj){
        return $http.post('/login', obj);
      },
      logout: function(){
        return $http.delete('/api/user');
      }
  }
  }])
