angular.module('app').controller('cartCtrl', function($scope, $timeout, $stateParams,  templeService, $cookies){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);


// $scope.addedmessage = function() {
//        $scope.msg="Added to cart!";
//        $scope.showMessage = true;
//        $timeout(function(){
//           $scope.showMessage = false;
//        }, 2000);
//     };


function cartCounter(){
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


var gettotal = function (){
  var grandtotal = {
    total: 0
  }
  for (var i = 0; i < $scope.cart.length; i++) {
    grandtotal.total += ($scope.cart[i].quantity * $scope.cart[i].size.price)
  }
  $scope.grandtotal = grandtotal.total

}

gettotal();

// $scope.quantityupdate = function(index){
//   console.log($scope.cart[index].quantity);
//   console.log($scope.cart);
//   gettotal();
// };




});
