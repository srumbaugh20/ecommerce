angular.module('app').controller('headerCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

$scope.cart = $cookies.getObject('cart') || [];

function cartCounter (){
  var cartCount = {
    num: 0
  };
  for (var i = 0; i < $scope.cart.length; i++) {
    cartCount.num += $scope.cart[i].quantity;
    console.log("for loop", cartCount);
  }
  $scope.cartnumber = cartCount.num
  console.log("cart count", $scope.cartnumber);
}

cartCounter();

// $scope.$watch($scope.cart, function() {
//         cartCounter();
//     });

});
