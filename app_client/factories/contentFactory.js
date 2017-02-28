angular.module('soundcloud')
  .factory('contentFactory', ['$http', '$window', function($http, $window){
    return{
      getCurrentUser: function(){
        return $http.get('/api/user');
      }
      }
  }])