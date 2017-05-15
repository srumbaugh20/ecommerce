angular.module('app').controller('watercolorsCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

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


$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);

var getData = function(){
  	storeService.getWatercolors().then(function(response){
  		$scope.watercolors = response.data
  		console.log(response.data);
  	})

  }

getData();




});
