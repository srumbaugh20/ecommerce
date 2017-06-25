angular.module('app').controller('cartCtrl', function($scope, $timeout, $stateParams,  storeService, $cookies, $state){

$scope.test = "test works";


$scope.cart = $cookies.getObject('cart') || [];
console.log($scope.cart);

$scope.updatedmessage = function() {
       $scope.msg="Cart updated!";
       $scope.showMessage = true;
       $timeout(function(){
          $scope.showMessage = false;
       }, 2000);
    };

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

$timeout(function() {
            console.log($scope.grandtotal++);
        }, 500);

var shipCost = function(){
  var ship = 0;
  if($scope.grandtotal === 0){
    ship = 0
  }else if ($scope.grandtotal > 0 && $scope.grandtotal < 47){
    ship = 6
  } else if ($scope.grandtotal > 47){
    ship = 0
  }
  $scope.shipping = ship;
}

shipCost();

$scope.superTotal = $scope.shipping + $scope.grandtotal;


$scope.quantityupdate = function(index){
  console.log($scope.cart[index].quantity);
  console.log($scope.cart);
  $cookies.putObject('cart', $scope.cart);
  gettotal();
  $scope.updatedmessage();
  $timeout(function(){
     $state.transitionTo($state.current, {id:$stateParams.id}, { reload: true});
  }, 1000);
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
  swal("Deleted!", "That item has been deleted.", "success");
  $timeout(function(){
     $state.transitionTo($state.current, {id:$stateParams.id}, { reload: true});
  }, 1000);
});

}




});
