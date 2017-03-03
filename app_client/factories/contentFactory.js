angular.module('soundcloud')
  .factory('contentFactory', ['$http', function($http){
    return{
      getCurrentUser: function(){
        return $http.get('/api/user');
      },
      updateUserImage: function(image){
        console.log(image);
        return $http.put('/api/user', image);
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
      },
      getStreamSongs: function(){
        return $http.get('/api/stream/songs')
      },
      getStreamAlbums: function(){
        return $http.get('/api/stream/albums')
      },
      likeSong: function(song_id){
        return $http.patch('/api/like/song', {song_id:song_id})
      },
      getArtist: function(artist_id){
        return $http.get('/api/artist/'+artist_id)
      },
      getArtistSongs: function(artist_id){
        return $http.get('/api/artist/songs/'+artist_id)
      },
      getArtistAlbums: function(artist_id){
        return $http.get('/api/artist/albums/'+artist_id)
      },
      comment: function(song_id, comment, time){
          console.log('factory song id', song_id);
          console.log('factory comment', comment);
          console.log('factory time',time)
          return $http.post('/api/comment', {song_id:song_id, comment:comment, time:time})
      },
      addPlay: function(song_id){
        return $http.put('/api/songs/'+song_id, {})
      },
      getComments: function(){
        return $http.get('/api/comment')
      }
    }
  }])
