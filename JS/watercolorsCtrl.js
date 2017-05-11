angular.module('app').controller('watercolorsCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);

var getData = function(){
  	storeService.getWatercolors().then(function(response){
  		$scope.watercolors = response.data
  		console.log(response.data);
  	})

  }

getData();


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
