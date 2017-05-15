angular.module('app').controller('checkoutCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies, stripe, $state ){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);

$scope.getcart = function(){
  return $scope.cart
}

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

$scope.emptycart = function(){
  $cookies.remove('cart');
  $scope.cart = [];
}


$scope.charge = function(){
  return stripe.card.createToken($scope.payment.card)
    .then(function(response){
      console.log($scope.cart);
      var payment = angular.copy($scope.payment);
      payment.card = void 0;
      payment.token = response.id;
      payment.cart = $scope.cart;
      payment.amount_paid = $scope.grandtotal;
      storeService.processPayment($scope.grandtotal * 100, payment);
}).then(function(){
  $state.go('confirmed');
  swal({
  title: "Thank You!",
  text: "We have recieved your order. It'll be shipped within 5 business days.",
  imageUrl: "./images/watercolorleaves.png",
  type: "success",
  timer: 10000
});
})
  .then(function(){
    $scope.emptycart();
    setTimeout(function(){ $state.go('home'); }, 6000);

})


}




});
