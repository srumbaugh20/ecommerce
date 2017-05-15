angular.module('app').controller('templeCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";


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

var getData = function(){
  	storeService.getTemples().then(function(response){
  		$scope.temples = response.data
  		console.log(response.data);
  	})

  }

getData();




});
