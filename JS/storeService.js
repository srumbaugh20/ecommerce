angular.module('app')
  .service('storeService', function ($http) {

      this.getTemples = function () {
        return $http.get('/get/temples').then(function(response){
          return response;
        })
      }

      this.getWatercolors = function () {
        return $http.get('/get/watercolors').then(function(response){
          return response;
        })
      }

      this.getOrders = function () {
        return $http.get('/get/orders').then(function(response){
          return response;
        })
      }

      this.getContact = function () {
        return $http.get('/get/contact').then(function(response){
          return response;
        })
      }

      this.deleteorder = function (id){
        console.log(id);
        return $http({
          method: 'DELETE',
          url: '/api/deleteorder/'+ id

        })
      }

      this.processPayment = function (grandtotal, payment){
        console.log('>>>>PAYMENT ', payment);
        return $http({
          method: 'POST',
          url: '/api/payment',
          data: {
            amount: grandtotal,
            amount_paid: payment.amount_paid,
            payment: payment,
            address: payment.address,
            city: payment.city,
            state: payment.state,
            zipcode: payment.zipcode,
            email: payment.email,
            cart: payment.cart
          }
        })
      }

      this.updateWater = function (water){
        console.log('>>>>WATER ', water);
        return $http({
          method: 'PUT',
          url: '/api/updatewater',
          data: {
            id: water.id,
            imageurl: water.imageurl,
            name: water.name,
            descript: water.descript,
            price_large: water.price_large,
            price_medium: water.price_medium,
            price_small: water.price_small
          }
        })
      }

      this.updateTemple = function (temple){
        console.log('>>>>Temple ', temple);
        return $http({
          method: 'PUT',
          url: '/api/updatetemple',
          data: {
            id: temple.id,
            imageurl: temple.imageurl,
            name: temple.name,
            location: temple.location,
            descript: temple.descript,
            price_large: temple.price_large,
            price_medium: temple.price_medium,
            price_small: temple.price_small
          }
        })
      }

      this.deleteTemple = function (temple){
        console.log(temple);

        return $http({
          method: 'DELETE',
          url: '/deletetemples/' + temple.id,
          data: {
            id: temple.id,
          }
        })
      }

      this.deletewatercolor = function (water){
        console.log(water);

        return $http({
          method: 'DELETE',
          url: '/deletewatercolor/' + water.id,
          data: {
            id: water.id,
          }
        })
      }

      this.addWatercolor = function (water){
        return $http({
          method: 'Post',
          url: '/createwatercolor',
          data: {
            imageurl: water.imageurl,
            name: water.name,
            descript: water.descript,
            price_large: water.price_large,
            price_medium: water.price_medium,
            price_small: water.price_small
          }
        })
      }

      this.addTemple = function (temple){
        return $http({
          method: 'Post',
          url: '/createtemple',
          data: {
            imageurl: temple.imageurl,
            name: temple.name,
            location: temple.location,
            descript: temple.descript,
            price_large: temple.price_large,
            price_medium: temple.price_medium,
            price_small: temple.price_small
          }
        })
      }


  });
