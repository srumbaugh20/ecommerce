angular.module('app')
  .service('templeService', function ($http) {

      this.getTemples = function () {
        return $http.get('/get').then(function(response){
          return response;
        })
      }

      // this.store = function(name, data) {
      // localStorage.setItem(name, JSON.stringify(data));
      // return 'Added to cart';
      // };
      //
      // this.getCart = function(name) {
      //   var item = localStorage.getItem(name);
      //   return JSON.parse(item);
      // };

      



  });
