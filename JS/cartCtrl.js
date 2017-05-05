angular.module('app').controller('cartCtrl', function($scope, $timeout, $stateParams,  templeService, $cookies){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

$scope.cart = $cookies.getObject('cart');
console.log($scope.cart);


// $scope.addedmessage = function() {
//        $scope.msg="Added to cart!";
//        $scope.showMessage = true;
//        $timeout(function(){
//           $scope.showMessage = false;
//        }, 2000);
//     };


function cartCounter(){
  var cartCount = 0;
  for (var i = 0; i < $scope.cart.length; i++) {
    cartCount += $scope.cart[i].quantity;
    console.log("for loop", cartCount);
  }
  $scope.cartnumber.num = cartCount
  console.log("cart count", $scope.cartnumber);
}

cartCounter();

});
