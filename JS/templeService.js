angular.module('app')
  .service('templeService', function ($http) {

      this.getTemples = function () {
        return $http.get('/get').then(function(response){
          console.log(response);
          return response;
        })
      }

      // this.addMessage = function ( message ) {
      //   return $http.post('/messages', { message: message });
      // }

  });
