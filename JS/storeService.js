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

          // data: {
          //   orderid: id
          // }
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


  });
