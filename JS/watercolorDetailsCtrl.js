angular.module('app').controller('watercolorDetailsCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies){

$scope.test = "test works";

$scope.cartnumber = {num: 0};

$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);


var getSingleData = function(){
  storeService.getWatercolors().then(function(response){
    for (var i = 0; i < response.data.length; i++) {
      if(response.data[i].id == $stateParams.id){
        $scope.singleitem = response.data[i];
      }
    }
  })

}

getSingleData();


$scope.sizes = [
  {size: 'Large-11"x14"', price: 24},
  {size: 'Medium-8"x10"', price: 18},
  {size: 'Small-4"x6"', price: 12}
];



$scope.select_size = function(){
  $scope.price = '$'+$scope.size_option.price
  console.log($scope.size_option);
}

$scope.addedmessage = function() {
       $scope.msg="Added to cart!";
       $scope.showMessage = true;
       $timeout(function(){
          $scope.showMessage = false;
       }, 2000);
    };

$scope.addtocart = function(){
  if ($scope.cart.length === 0) {
    $scope.cart.push({
      id: $scope.singleitem.id,
      name:$scope.singleitem.name,
      descript:$scope.singleitem.descript,
      size: $scope.size_option,
      image: $scope.singleitem.imageurl,
      quantity: $scope.quantity
  });
  cartCounter();
} else {
  var flag = false;
  for (var i = 0; i < $scope.cart.length; i++) {
    if ($scope.cart[i].id === $scope.singleitem.id && $scope.cart[i].size.size === $scope.size_option.size){
      $scope.cart[i].quantity += $scope.quantity
      flag = true;
    }
  }
  cartCounter();
  if (!flag){
    $scope.cart.push({
      id: $scope.singleitem.id,
      name:$scope.singleitem.name,
      descript:$scope.singleitem.descript,
      size: $scope.size_option,
      image: $scope.singleitem.imageurl,
      quantity: $scope.quantity
    })
    cartCounter();
  }
}



$cookies.putObject('cart', $scope.cart);
console.log($scope.cart);
$scope.addedmessage();

}



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
