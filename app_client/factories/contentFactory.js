angular.module('soundcloud')
  .factory('contentFactory', ['$http', function($http){
    return{
      getCurrentUser: function(){
        return $http.get('/api/user');
      },
      getSongs:function(){
        return $http.get('/api/songs')
      },
      getUsers:function(){
        return $http.get('/api/allusers')
      },
      getAggregateStats: function(){
        return $http.get('/api/user/aggregates')
      },
      deleteUser: function(){
        return $http.delete('/api/user/delete')
      },
      followUser: function(id){
        return $http.patch('/api/user/follow', {followid:id})
      },
      getFollowing: function(){
        return $http.get('/api/user/following')
      },
      getUserLikedSongs: function(){
        return $http.get('/api/user/likedsongs')
      },
      getUserLikedAlbums: function(){
        return $http.get('/api/user/likedalbums')
      }
    }
  }])
