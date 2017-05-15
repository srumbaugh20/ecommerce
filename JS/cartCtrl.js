angular.module('app').controller('cartCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";


$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);

$scope.cartCounter = function (){
  var cartCount = {
    num: 0
  };
  for (var i = 0; i < $scope.cart.length; i++) {
    cartCount.num += $scope.cart[i].quantity;
  }
  $scope.cartnumber = cartCount.num;
  console.log("cart count", $scope.cartnumber);
}

$scope.cartCounter();


$scope.updatedmessage = function() {
       $scope.msg="Cart updated!";
       $scope.showMessage = true;
       $timeout(function(){
          $scope.showMessage = false;
       }, 2000);
    };

var gettotal = function (){
  var grandtotal = {
    total: 3
  }
  for (var i = 0; i < $scope.cart.length; i++) {
    grandtotal.total += ($scope.cart[i].quantity * $scope.cart[i].size.price)
  }
  $scope.grandtotal = grandtotal.total

}

gettotal();


$scope.quantityupdate = function(index){
  console.log($scope.cart[index].quantity);
  console.log($scope.cart);
  $cookies.putObject('cart', $scope.cart);
  gettotal();
  $scope.updatedmessage();
};



$scope.remove = function($index){
  swal({
  title: "Are you sure?",
  text: "Remove the item from the cart?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#DD6B55",
  confirmButtonText: "Yes, remove item!",
  closeOnConfirm: false
},
function(){
  if ($index > -1) {
      $scope.cart.splice($index, 1);
    }
  $cookies.putObject('cart', $scope.cart);
  $scope.$apply();
  swal("Deleted!", "That order has been deleted.", "success");
});
}




});
