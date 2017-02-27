angular.module('auth')
  .factory('authFactory', ['$http', '$window', function($http, $window){
    return {
      register: function(data){
        return $http.post('/api/register', data)
      },
      login: function(data){
        return $http.post('/api/login', data)
      },
      saveToken: function (token) {
        $window.localStorage['mean-token'] = token;
      },
      getToken: function () {
        return $window.localStorage['mean-token'];
      },
      logout: function() {
        $window.localStorage.removeItem('mean-token');
      },
      isLoggedIn: function() {
        var token = this.getToken();
        var payload;

        if(token){
          payload = token.split('.')[1];
          payload = $window.atob(payload);
          payload = JSON.parse(payload);

          return payload.exp > Date.now() / 1000;
        } else {
          return false;
        }
      },
      currentUser: function() {
        if(this.isLoggedIn()){
          var token = this.getToken();
          var payload = token.split('.')[1];
          payload = $window.atob(payload);
          payload = JSON.parse(payload);
          return {
            email : payload.email,
            first_name : payload.first_name
          };
        }
      }
    }
  }])
