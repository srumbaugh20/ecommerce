angular.module('app').controller('headerCtrl', function($scope, $timeout, $stateParams,  templeService, $cookies){

$scope.test = "test works";



$scope.cart = $cookies.getObject('cart');
console.log($scope.cart);

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




// $scope.$watch('click', function() {
//         cartCounter();
//     });

});
