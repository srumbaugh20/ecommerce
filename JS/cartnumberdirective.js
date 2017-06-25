angular.module('app')
.directive('cartdirective', function() {
  //
  return {
    templateUrl: './app/cartNumber.html',
    restrict: 'AE',
    controller: function($scope, $timeout, $stateParams,  storeService, $cookies){

    $scope.cart = $cookies.getObject('cart') || [];

    var cartCounter = function (){
      var cartCount = {
        num: 0
      };
      for (var i = 0; i < $scope.cart.length; i++) {
        cartCount.num += $scope.cart[i].quantity;
      }
      $scope.cartnumber = cartCount.num;
      console.log("cart count", $scope.cartnumber);
    }

    cartCounter();


    }

  }

});
